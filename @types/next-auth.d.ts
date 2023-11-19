import { DefaultSession, DefaultUser, NextAuth } from "next-auth";

declare module "next-auth" {
  interface User{
    id: string;
    bio: string | null;
    phone: string | null;
    groupId: string | null;
    picturePath: string | null;
  }
  interface Session {
    user: User & {
      id: string;
      bio: string | null;
      phone: string | null;
      picturePath: string | null;
      groupId: string | null;
    },
    token: {
      id: string;
      bio: string | null;
      phone: string | null;
      picturePath: string | null;
      groupId: string | null;
    };
  }
}
