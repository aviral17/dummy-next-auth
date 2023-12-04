import startDb from "@/lib/db";
import UserModel from "@/models/userModel";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import type { NextApiRequest } from "next";

interface Credentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", // 2nd strategy is database apart from jwt, NOTE: that we need ```NEXTAUTH_SECRET``` in .env file
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {}, // empty object as this provides UI for signin but we dont want that
      async authorize(
        credentials: Record<never, string> | undefined,
        req: any
      ) {
        if (!credentials) throw Error("Credentials are missing!");

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        await startDb(); // after gettin gcustom email,password , we call this function to connect to our database

        const user = await UserModel.findOne({ email });
        if (!user) throw Error("Email/Password Mismatch!");

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) throw Error("Email/Password Mismatch!");

        return {
          id: user._id, // Assuming the user object has an _id property, as without this, its giving typescript error
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  // passing these dewtails to Frontend so using callbacks
  callbacks: {
    jwt(params: any) {
      if (params.user) {
        params.token.id = params.user.id;
      }

      // returning final token
      return params.token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        console.log("Session => ", session);
      }
      return session;
    },
  },
};

const authHandler = NextAuth(authOptions);

// export const GET = authHandler
// export const POST = authHandler

export { authHandler as GET, authHandler as POST };
