"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { clearTokenCache } from "@/app/_presenters/data/auth/backstageApiAxios";

type Props = {
  children?: React.ReactNode;
};

function AuthProviderInner({ children }: Props) {
  const { data: session, status } = useSession();

  useEffect(() => {
    // Clear token cache when user signs out
    if (status === "unauthenticated") {
      clearTokenCache();
    }
  }, [status]);

  return <>{children}</>;
}

export default function AuthProvider({ children }: Props) {
  return (
    <SessionProvider>
      <AuthProviderInner>{children}</AuthProviderInner>
    </SessionProvider>
  );
}
