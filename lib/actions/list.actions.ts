"use server";

import { Session } from "next-auth";
import { prisma } from "../db/prisma";
import { revalidatePath } from "next/cache";

interface ListTaskProps {
  session: Session | null;
  data: {
    list: string;
  };
}

interface groupProps {
  groupIdPrisma: string | undefined;
}

export async function createList({
  session,
  data,
}: ListTaskProps): Promise<void> {
  if (!session?.user?.id) {
    throw new Error("User ID is missing.");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user || !user.groupId) {
    throw new Error("User's group ID is missing.");
  }

  try {
    const newList = await prisma.list.create({
      data: {
        list: data.list,
        status: "Not Completed",
        authorId: session.user.id,
        groupId: user.groupId,
      },
    });
    console.log(newList);
    revalidatePath("/lists");
  } catch (error: any) {
    throw new Error(`Failed to create post: ${error.message}`);
  }
}

export async function fetchGroupLists({ groupIdPrisma }: groupProps) {
  try {
    const lists = await prisma.list.findMany({
      where: {
        groupId: groupIdPrisma,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    });

    return lists;
  } catch (error: any) {
    throw new Error(`Failed to fetch post: ${error.message}`);
  }
}
