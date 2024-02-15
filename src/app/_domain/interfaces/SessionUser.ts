import { DefaultSession } from "next-auth";

export type SessionUser = DefaultSession & {
  email: string;
  image: string;
  name: string;
  google_id: string;
};
