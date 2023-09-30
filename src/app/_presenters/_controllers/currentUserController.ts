import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getAuthenticatedUser } from "../_data/users";

const currentUserController = () => {
  const { data: session } = useSession();
  const { user: sessionUser } = session || {};

  const resp = useQuery({
    queryKey: ["authenticatedUser"],
    queryFn: () => getAuthenticatedUser(sessionUser),
  });

  console.log("resp", resp);
  console.log("resp data", resp.data);

  return {
    currentUser: resp.data || {},
  };
};

export default currentUserController;
