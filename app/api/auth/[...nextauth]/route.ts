import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { CustomPrismaAdapter } from "@/prisma/customPrismaAdapter";
import { PrismaClient, User } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcryptjs';
import { LoginUserValidation } from "@/lib/validations/user";

export const authOptions: NextAuthOptions = {
  adapter: CustomPrismaAdapter(prisma as PrismaClient) as Adapter,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'text', placeholder: 'test@test.com' },
        password: { type: 'password', placeholder: 'Pa$$w0rd' },
      },
      async authorize(credentials, req) {
        const { email, password } = LoginUserValidation.parse(credentials);
        const user = await prisma.user.findUnique({
          where: { email: email },
        });
        if (!user || !user.hashedPassword) return null;

        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

        if (!isPasswordValid) return null;

        return user;
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user, }) {
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
