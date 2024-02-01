"use server";

import bcrypt from "bcryptjs";
import { Session } from "next-auth";
import { prisma } from "../db/prisma";
import profilePicHolder from "@/public/assets/profile-pic-placeholder.png"
import { revalidateTag } from "next/cache";

interface UpdateUserProps {
  session: Session | null;
  data: {
    userImage?: string;
    name?: string;
    bio?: string;
    phone?: string;
  };
}

interface CreateUserProps {
  data: {
    email: string;
    password: string;
  };
}

interface GetUserInfoProps {
  session: Session | null;
}


export async function updateUser({
  session,
  data,
}: UpdateUserProps): Promise<void> {
  // Filter out undefined fields
  const updateData: Partial<typeof data> = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined)
  );

  try {
    await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: updateData,
    });

    revalidateTag('posts')
  } catch (error: any) {
    console.error("Error details:", error);
    throw new Error(`Failed to update user: ${error.message}`);
  }
}


export async function createUser({
  data,
}: CreateUserProps): Promise<{ success: boolean; message: string }> {
  console.log(data.email)

  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (user) {
    return { success: false, message: "This user already exists" };
  }

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        groupId: "65142379c592bef7f2b1e3c7",
      },
    });
    return { success: true, message: "User created successfully" };
  } catch (error) {
    return { success: false, message: "Failed to create user, please try again" };
  }
}


export async function getUserInfo({
  session,
}: GetUserInfoProps) {
  if (!session) {
    throw new Error("Missing session");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        userImage: true,
        bio: true,
        phone: true,
        email: true,
      }
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user
  } catch (error) {
    throw new Error("Failed to fetch user info");
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};


