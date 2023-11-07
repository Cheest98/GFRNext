"use server";

import { prisma } from "../db/prisma";
import { Session } from "next-auth";
import bcrypt from  "bcryptjs"

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
    email?: string;
    password: string;
  };
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
    throw new Error(`Failed to create group: ${error.message}`);
  }
}


export async function createUser({
  data,
}: CreateUserProps): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (user ===  null) {
    throw new Error("This user already exist");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  try {
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
  } catch (error: any) {
    throw new Error(`Failed to create User: ${error.message}`);
  }
}