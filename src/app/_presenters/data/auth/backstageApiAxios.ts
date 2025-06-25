import axios from "axios";
import qs from "qs";
import { getSession } from "next-auth/react";

import { useAppStore } from "../store/store";

// Define the custom user type with our added properties
interface CustomUser {
  email: string;
  google_id: string;
  name: string;
  image?: string | null;
  idToken?: string;
  accessToken?: string;
}

// Token cache to avoid repeated session calls
let tokenCache: {
  token: string | null;
  expiresAt: number;
  userEmail: string | null;
  userGoogleId: string | null;
} = {
  token: null,
  expiresAt: 0,
  userEmail: null,
  userGoogleId: null,
};

// Helper function to check if token is expired
const isTokenExpired = (): boolean => {
  return Date.now() >= tokenCache.expiresAt;
};

// Helper function to clear token cache
export const clearTokenCache = (): void => {
  tokenCache = {
    token: null,
    expiresAt: 0,
    userEmail: null,
    userGoogleId: null,
  };
};

// Helper function to get valid token (cached or fresh)
const getValidToken = async (): Promise<{
  token: string;
  userEmail: string;
  userGoogleId: string;
} | null> => {
  // Return cached token if it's still valid
  if (tokenCache.token && !isTokenExpired()) {
    return {
      token: tokenCache.token,
      userEmail: tokenCache.userEmail!,
      userGoogleId: tokenCache.userGoogleId!,
    };
  }

  try {
    // Fetch fresh session only when needed
    const session = await getSession();

    if (!session?.user) {
      clearTokenCache();
      return null;
    }

    // Type assertion to access our custom properties
    const customUser = session.user as CustomUser;

    // Use ID token if available, otherwise fall back to access token
    const authToken = customUser.idToken || customUser.accessToken;

    if (!authToken) {
      clearTokenCache();
      return null;
    }

    // Cache the token with expiration (Google ID tokens typically expire in 1 hour)
    // We'll refresh 5 minutes before actual expiration for safety
    const expirationTime = Date.now() + 55 * 60 * 1000; // 55 minutes

    tokenCache = {
      token: authToken,
      expiresAt: expirationTime,
      userEmail: customUser.email,
      userGoogleId: customUser.google_id,
    };

    return {
      token: authToken,
      userEmail: customUser.email,
      userGoogleId: customUser.google_id,
    };
  } catch (error) {
    console.error("Error fetching session:", error);
    clearTokenCache();
    return null;
  }
};

export const backstageApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

backstageApiClient.defaults.paramsSerializer = (p) => {
  return qs.stringify(p, { arrayFormat: "brackets" });
};

backstageApiClient.interceptors.request.use(async (config) => {
  const { projectAuthKey } = useAppStore.getState();

  if (projectAuthKey) {
    config.headers["Project-Auth-Key"] = projectAuthKey;
    return config;
  }

  try {
    // Get valid token (cached or fresh)
    const authData = await getValidToken();

    if (!authData) {
      throw new Error("Authentication token not found. Aborting request.");
    }

    config.headers["Authorization"] = `Bearer ${authData.token}`;
    config.headers["X-User-Email"] = authData.userEmail;
    config.headers["X-User-Google-ID"] = authData.userGoogleId;
  } catch (e) {
    console.error("Error setting authorization headers:", e);
    throw new Error("Failed to authenticate request");
  }

  return config;
});

// Add response interceptor to handle auth errors and clear cache
backstageApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we get a 401 Unauthorized, clear the token cache
    if (error.response?.status === 401) {
      console.log("Auth error detected, clearing token cache");
      clearTokenCache();
    }
    return Promise.reject(error);
  }
);
