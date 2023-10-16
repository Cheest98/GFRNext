import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { CustomPrismaAdapter } from "@/prisma/customPrismaAdapter";
import { PrismaClient, User } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: CustomPrismaAdapter(prisma as PrismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.bio = (user as User).bio;
      session.user.phone = (user as User).phone;
      session.user.groupId = (user as User).groupId;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
