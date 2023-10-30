import NextAuth from "next-auth";

import { authOptions } from "@/app/_presenters/data/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
