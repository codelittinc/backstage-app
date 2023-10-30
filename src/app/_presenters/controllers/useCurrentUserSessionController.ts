"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { useAppStore } from "../data/store/store";

const useCurrentUserSessionController = () => {
  const { data: session } = useSession();
  const { setSessionUser, sessionUser } = useAppStore();

  useEffect(() => {
    setSessionUser(session?.user);
  }, [setSessionUser, session?.user]);

  return {
    sessionUser: sessionUser,
  };
};

export default useCurrentUserSessionController;
