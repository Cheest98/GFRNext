import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { LoginUserValidation } from "@/lib/validations/user";
import { CustomPrismaAdapter } from "@/prisma/customPrismaAdapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: CustomPrismaAdapter(prisma as PrismaClient) as Adapter,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/signin'
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: 'text', placeholder: 'test@test.com' },
        password: { label: "Password", type: 'password', placeholder: 'Pa$$w0rd' },
      },
      async authorize(credentials, req) {
        const { email, password } = LoginUserValidation.parse(credentials);

        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!user || !user.password) return null;
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return null;

        console.log(user)

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          bio: user.bio,
          phone: user.phone,
          groupId: user.groupId,
        };
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        console.log("Google profile data:", profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,

        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          bio: user.bio,
          name: user.name,
          email: user.email,
          phone: user.phone,
          groupId: user.groupId,
        }
      }
      return token;
    },
    async session({ session, token }) {

      const userId = token.id as string;

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      
      if (user) {
        session.user = {
          ...session.user,
          groupId: user.groupId,
          id: user.id,
          bio: user.bio,
          name: user.name,
          email: user.email,
          phone: user.phone, 
        };
      }
  
      return session;
    
        

    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
