import { useSession } from "next-auth/react";
import {
  backstageApiClient,
  setAuthorizationHeader,
} from "../auth/backstageApiAxios";
import { useQuery } from "@tanstack/react-query";

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
  session: SessionUser
): Promise<User> => {
  setAuthorizationHeader(session);
  const { data } = await backstageApiClient.get("/users/2");
  const user = parseApiResponse(data);
  console.log("uu", user);
  return user;
};
