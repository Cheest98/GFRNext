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
  session:{
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name:"Credentials",
      credentials: {
        email: { label:"Email", type: 'text', placeholder: 'test@test.com' },
        password: { label:"Password", type: 'password', placeholder: 'Pa$$w0rd' },
      },
      async authorize(credentials, req) {
        const { email, password } = LoginUserValidation.parse(credentials);
        const user = await prisma.user.findUnique({
          where: { email: email },
        });
        if (!user || !user.password) return null;
        const isPasswordValid = await bcrypt.compare(password, user.password);
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
    session: async ({ session, user }) => {
      if (user) {
        session.user.id = user.id;
        session.user.bio = (user as User).bio;
        session.user.phone = (user as User).phone;
        session.user.groupId = (user as User).groupId;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        // other properties
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
