import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getAuthenticatedUser } from "../_data/users";

const useCurrentUserController = () => {
  const { data: session } = useSession();

  const { data: currentUser } = useQuery({
    queryKey: ["user", session?.user?.email],
    queryFn: () => {
      if (!session?.user) {
        return null;
      }
      return getAuthenticatedUser(session.user);
    },
  });

  return {
    currentUser: currentUser,
  };
};

export default useCurrentUserController;
