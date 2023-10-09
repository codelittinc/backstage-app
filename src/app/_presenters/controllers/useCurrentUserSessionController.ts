"use client";
import { useSession } from "next-auth/react";
import { useAppStore } from "../data/store/store";
import { useEffect } from "react";

const useCurrentUserSessionController = () => {
  const { data: session } = useSession();
  const { setSessionUser, sessionUser } = useAppStore();

  useEffect(() => {
    setSessionUser(session?.user);
  }, [session?.user]);

  return {
    sessionUser: sessionUser,
  };
};

export default useCurrentUserSessionController;
