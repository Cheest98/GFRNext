import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      bio: string | null;
      phone: string | null;
      token?: string;
      groupId: string | null;
    } & DefaultSession["user"];
  }
}
