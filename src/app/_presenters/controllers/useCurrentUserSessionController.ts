"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { useAppStore } from "../data/store/store";

const useCurrentUserSessionController = () => {
  const { data: session } = useSession();
  const { setSessionUser, sessionUser } = useAppStore();
  const user = session?.user;

  useEffect(() => {
    if (user) {
      setSessionUser(user);
    }
  }, [user, setSessionUser]);

  return {
    sessionUser: sessionUser,
  };
};

export default useCurrentUserSessionController;
