export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/Creators/Dashboard/:path*", "/Creators/Profile"],
};
