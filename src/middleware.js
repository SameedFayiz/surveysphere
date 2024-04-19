export { default } from "next-auth/middleware";

export const config = { matcher: ["/Creators/Dashboard/:path*"] };

// import { withAuth } from "next-auth/middleware";

// export default withAuth(function middleware(req) {}, {
//   callbacks: {
//     authorized: ({ req, token }) => {
//       if (
//         req.nextUrl.pathname.startsWith("/Creators/Dashboard") &&
//         token === null
//       ) {
//         return false;
//       }
//       return true;
//     },
//   },
// });
