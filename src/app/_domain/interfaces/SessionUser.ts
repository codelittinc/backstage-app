import { DefaultSession } from "next-auth";

export type SessionUser = DefaultSession & {
  email: string;
  google_id: string;
  image: string;
  name: string;
};
