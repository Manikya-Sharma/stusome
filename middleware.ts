export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/chat",
    "/dashboard",
    "/doubts",
    "/posts",
    "/explore",
    "/settings",
    "/posts/:path/edit",
  ],
};
