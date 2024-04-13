import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (typeof credentials !== "undefined") {
          let body = {
            email: credentials.email,
            password: credentials.password,
          };
          let res = await fetch(`${process.env.DEV_URL}/api/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          res = await res.json();
          if (res.user) {
            return { ...res.user, token: res.token };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log(user);
      console.log(token);
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.jwt = token.jwt;
      }
      return session;
    },
  },
  pages: { newUser: "/Creators/Dashboard" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
