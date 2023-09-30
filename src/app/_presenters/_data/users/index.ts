import axios from "axios";
import { getUrl } from "../../../../api";
import { useSession } from "next-auth/react";

interface SessionUser {
  email: string;
  google_id: string;
  name: string;
}

interface ApiUser {
  first_name: string;
  last_name: string;
  google_id: string;
  slug: string;
  email: string;
}

const parseApiResponse = (data: ApiUser): User => {
  const { google_id, email, first_name, last_name, slug } = data;

  return {
    googleId: google_id,
    email: email,
    firstName: first_name,
    lastName: last_name,
    slug: slug,
    fullName: `${first_name} ${last_name}`,
  };
};

export const getAuthenticatedUser = async (
  session_user: SessionUser
): Promise<User> => {
  const authorizationData = {
    user: {
      google_id: session_user.google_id,
      email: session_user.email,
      first_name: session_user.name?.split(" ")[0],
      last_name: session_user.name?.split(" ")[1],
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

export function useGetCurrentUser(): User | {} {
  const { data } = useSession();
  return data?.user || {};
}
