import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
        return session;
      }

      const data = {
        email: user.email!,
        google_id: token.id as string,
        name: user.name!,
        image: session!.user!.image,
        idToken: token.idToken,
      };

      return {
        ...session,
        user: {
          ...data,
        },
      };
    },
    jwt: ({ token, user, account }) => {
      // Store the Google ID token when first signing in (more stable than access token)
      if (account) {
        token.idToken = account.id_token;
        token.accessToken = account.access_token; // Keep access token for immediate use
      }

      // Add user ID when user is available
      if (user) {
        const u = user as unknown as any;
        token.id = u.id;
      }

      return token;
    },
  },
};
