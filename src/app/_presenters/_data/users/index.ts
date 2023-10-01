import axios from "axios";
import { getUrl } from "../../../../api";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

interface SessionUser {
  email: string;
  google_id: string;
  name: string;
  image: string;
}

interface ApiUser {
  first_name: string;
  last_name: string;
  google_id: string;
  slug: string;
  email: string;
}

const parseApiResponse = (user: ApiUser, sessionUser: SessionUser): User => {
  const { google_id, email, first_name, last_name, slug } = user;

  return {
    googleId: google_id,
    email: email,
    firstName: first_name,
    lastName: last_name,
    slug: slug,
    fullName: `${first_name} ${last_name}`,
    image: sessionUser.image,
  };
};

export const getAuthenticatedUser = async (
  session_user: SessionUser | undefined
): Promise<User | null> => {
  if (!session_user) {
    return null;
  }

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

  axios.defaults.headers.common["Authorization"] = `Bearer ${authorization}`;

  const { data } = await axios.get(getUrl("users/me"));
  return parseApiResponse(data, session_user);
};
