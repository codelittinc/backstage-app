"use client";
import { User } from "@/components/user.component";
import type { InferGetServerSidePropsType } from "next";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <>
      <div>
        <User />
      </div>
    </>
  );
}
