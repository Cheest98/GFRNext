"use server";

import { prisma } from "../db/prisma";
import { Session } from "next-auth";

interface UpdateUserProps {
  session: Session | null;
  data: {
    image?: string;
    name?: string;
    bio?: string;
    phone?: string;
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
