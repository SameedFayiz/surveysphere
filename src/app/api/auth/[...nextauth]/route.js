import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "@/models/user";
import connectDB from "@/lib/dbConnect";
import { compareSync } from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        rememberMe: { type: "text" },
      },
      async authorize(credentials, req) {
        if (typeof credentials !== "undefined") {
          const { email, password, rememberMe } = credentials;

          if (!email || !password) {
            return null;
          }

          await connectDB();
          const user = await Users.findOne({ email: email });
          if (!user) {
            return { error: "userNotFound" };
          }

          const isPasswordValid = compareSync(password, user.password);
          if (!isPasswordValid) {
            return { error: "incorrectPassword" };
          }
          user.password = undefined;

          if (rememberMe === "on") {
            authOptions.session.maxAge = 30 * 24 * 60 * 60;
          }

          return {
            id: user._id,
            name: user.firstName + user.lastName,
            email: user.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  callbacks: {
    jwt: async ({ token, user, session }) => {
      // console.log("Token callback", token, user);
      if (user) {
        return { ...token, user };
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      // console.log("Session callback", session);
      if (token.user) {
        return { ...session, user: { ...token.user } };
      }
      return session;
    },
    signIn: async ({ user, account, profile, email, credentials }) => {
      if (user?.error === "userNotFound") {
        throw new Error(user?.error);
      } else if (user?.error === "incorrectPassword") {
        throw new Error(user?.error);
      } else if (!user) {
        throw new Error("Internal server error");
      }
      return true;
    },
  },
  pages: { signIn: "/Creators/Login", newUser: "/Creators/Dashboard" },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
