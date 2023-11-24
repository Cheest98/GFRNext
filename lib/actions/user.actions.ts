"use server";

import bcrypt from "bcryptjs";
import { Session } from "next-auth";
import { prisma } from "../db/prisma";

interface UpdateUserProps {
  session: Session | null;
  data: {
    image?: string;
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


interface GetUserImageProps {
  email: string | null;
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
  } catch (error: any) {
    console.error("Error details:", error);
    throw new Error(`Failed to update usser: ${error.message}`);
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



export async function getUserImage({
  email,
}: GetUserImageProps):  Promise<{ image: string | null }> {



  if (!email ) {
    throw new Error(" Missing email ");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { image: true }
    });

    if (!user) {
      throw new Error("This email not  exist");
    }

    return user;
  } catch (error) {
    throw new Error("This email not  exist");
  }
}

