"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getAuthenticatedUser } from "../_data/users";
import { useAppStore } from "../_data/store/store";
import { useRouter } from "next/navigation";
import routes from "@/routes";

const useCurrentUserController = () => {
  const { data: session } = useSession();
  const { showAlert } = useAppStore();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["user", session?.user?.email],
    queryFn: () => {
      return getAuthenticatedUser(session?.user);
    },
    onError: () => {
      showAlert({
        color: "error",
        title: "Authentication error",
        content:
          "There was an error authenticating your user. Please try signing in again.",
      });
      router.push(routes.signInPath);
    },
  });

  return {
    currentUser: data,
    isLoading: isLoading || !session || !data,
  };
};

export default useCurrentUserController;
