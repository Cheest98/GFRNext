"use server";

import { prisma } from "../db/prisma";
import { Session } from "next-auth";

interface CreateGroupProps {
  session: Session | null;
  data: {
    name: string;
    description: string;
  };
}

export async function createGroup({
  session,
  data,
}: CreateGroupProps): Promise<void> {
  if (!session?.user?.id) {
    throw new Error("User ID is missing.");
  }

  try {
    const newGroup = await prisma.group.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId: session.user.id,
      },
    });

    // Update the user's groupId with the newly created group's ID
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        groupId: newGroup.id,
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to create group: ${error.message}`);
  }
}
