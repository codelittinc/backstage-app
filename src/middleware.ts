export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/((?!api|users/sign-in|project-dashboard).*)"],
};
