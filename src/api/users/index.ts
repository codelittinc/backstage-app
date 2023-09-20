import axios from "axios";
import { getUrl } from "..";
import { useSession } from "next-auth/react";

const BASE_QUERY_KEY = "users";

interface SessionUser {
  email: string;
  google_id: string;
  name: string;
}

const parseApiResponse = (data) => {
  const { google_id, email, first_name, last_name, slug } = data;
  return {
    googleId: google_id,
    email: email,
    firstName: first_name,
    lastName: last_name,
    slug: slug,
  };
};

export const getAuthenticatedUser = async (session_user: SessionUser) => {
  const authorizationData = {
    user: {
      google_id: session_user.google_id,
      email: session_user.email,
      first_name: session_user.name?.split(" ")[0],
      last_name: session_user.name?.split(" ")[0],
    },
  };

  const authorizationDataJson = JSON.stringify(authorizationData);
  const authorization = btoa(authorizationDataJson);

  const { data } = await axios.get(getUrl("users/me"), {
    headers: {
      Authorization: `Bearer ${authorization}`,
    },
  });
  return parseApiResponse(data);
};

export function useGetCurrentUser() {
  const { data } = useSession();
  return data?.user || {};
}
