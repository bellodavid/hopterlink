// middleware.js
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/account",
    "/business/:path*",
    "/add-a-business",
    "/messages",
    "/manage-your-business",
  ],
};
