import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getAuthenticatedUser } from "@/app/_presenters/data/users";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/users/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      const { user } = session;
      if (!user) {
        return {};
      }

      const data = {
        email: user.email!,
        google_id: token.id as string,
        name: user.name!,
        image: session!.user!.image,
      };

      return {
        user: {
          ...data,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
  },
};
