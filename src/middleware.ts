export { default } from "next-auth/middleware";

// Only protect specific authenticated routes instead of everything
export const config = {
  matcher: [
    "/users/:path*",
    "/projects/:path*",
    "/customers/:path*",
    "/repositories/:path*",
    "/timesheets/:path*",
    "/analytics/:path*",
  ],
};
