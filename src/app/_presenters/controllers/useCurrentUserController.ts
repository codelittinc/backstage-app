"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { USERS_KEY } from "@/app/_domain/constants";
import routes from "@/routes";

import useCurrentUserSessionController from "./useCurrentUserSessionController";
import { useAppStore } from "../data/store/store";
import { getAuthenticatedUser } from "../data/users";

const useCurrentUserController = () => {
  const { sessionUser } = useCurrentUserSessionController();

  const { showAlert } = useAppStore();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: [USERS_KEY, sessionUser?.email],
    queryFn: () => {
      return getAuthenticatedUser();
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
    enabled: !!sessionUser, // Only enable the query if sessionUser is truthy
  });

  return {
    currentUser: data,
    isLoading: isLoading || !data,
  };
};

export default useCurrentUserController;
