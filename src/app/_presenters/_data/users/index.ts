import {
  backstageApiClient,
  setAuthorizationHeader,
} from "../auth/backstageApiAxios";

interface ApiUser {
  first_name: string;
  last_name: string;
  google_id: string;
  slug: string;
  email: string;
  image_url: string;
}

const parseApiResponse = (user: ApiUser): User => {
  const { google_id, email, first_name, last_name, slug, image_url } = user;

  return {
    googleId: google_id,
    email: email,
    firstName: first_name,
    lastName: last_name,
    slug: slug,
    fullName: `${first_name} ${last_name}`,
    imageUrl: image_url,
  };
};

export const getAuthenticatedUser = async (
  session_user: SessionUser | undefined
): Promise<User | null> => {
  if (!session_user) {
    return null;
  }
  setAuthorizationHeader(session_user);

  const { data } = await backstageApiClient.get("/users/me");
  return parseApiResponse(data);
};
