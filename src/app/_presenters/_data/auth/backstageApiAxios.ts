import axios from "axios";

export const backstageApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export function setAuthorizationHeader(session_user: SessionUser) {
  const authorizationData = {
    user: {
      google_id: session_user.google_id,
      email: session_user.email,
      first_name: session_user.name?.split(" ")[0],
      last_name: session_user.name?.split(" ")[1],
      image_url: session_user.image,
    },
  };
  const authorizationDataJson = JSON.stringify(authorizationData);
  const authorization = btoa(authorizationDataJson);

  backstageApiClient.defaults.headers[
    "Authorization"
  ] = `Bearer ${authorization}`;
}
