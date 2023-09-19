import axios from "axios";
import { getUrl } from "..";
import { useQuery } from "@tanstack/react-query";

const BASE_QUERY_KEY = "users";

interface SessionUser {
  email: string;
  google_id: string;
  name: string;
}

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
  return data;
};

// export function useGetMovies() {
//   return useQuery({
//     queryKey: [BASE_QUERY_KEY],
//     queryFn: () => getMovies(),
//   });
// }
