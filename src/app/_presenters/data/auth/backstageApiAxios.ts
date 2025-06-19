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
    // Get the session to access the access token
    const session = await getSession();
    console.log("Session Session", session);

    if (!session?.user) {
      throw new Error("Session user not found. Aborting request.");
    }

    // Type assertion to access our custom properties
    const customUser = session.user as CustomUser;

    // Use ID token if available, otherwise fall back to access token
    const authToken = customUser.idToken || customUser.accessToken;

    if (!authToken) {
      throw new Error("Authentication token not found. Aborting request.");
    }

    config.headers["Authorization"] = `Bearer ${authToken}`;

    // Optionally, you can also include user data in headers if your backend needs it
    config.headers["X-User-Email"] = customUser.email;
    config.headers["X-User-Google-ID"] = customUser.google_id;
  } catch (e) {
    console.error("Error setting authorization headers:", e);
    throw new Error("Failed to authenticate request");
  }

  return config;
});
