"use server";

import { Session } from "next-auth";
import { prisma } from "../db/prisma";
import { revalidatePath } from "next/cache";

interface CreateTaskProps {
  session: Session | null;
  data: {
    task: string;
  };
}

interface groupProps {
  groupIdPrisma: string | undefined;
}

interface UpdateTaskProps {
  session: Session | null;
  data: {
    id: string;
    status: string;
  };
}

export async function createTask({
  session,
  data,
}: CreateTaskProps): Promise<void> {
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
    const newTask = await prisma.task.create({
      data: {
        task: data.task,
        status: "To do",
        authorId: session.user.id,
        groupId: user.groupId,
      },
    });
    await prisma.activity.create({
      data: {
        type: "TASK_CREATED",
        userId: session.user.id,
        groupId: user.groupId,
      },
    });
    console.log(newTask);
    revalidatePath("/tasks");
  } catch (error: any) {
    throw new Error(`Failed to create post: ${error.message}`);
  }
}

export async function fetchGroupTasks({ groupIdPrisma }: groupProps) {
  try {
    const tasks = await prisma.task.findMany({
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

    return tasks;
  } catch (error: any) {
    throw new Error(`Failed to fetch post: ${error.message}`);
  }
}

export async function updateTask({ data, session }: UpdateTaskProps): Promise<void> {
  // Filter out undefined fields
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
    await prisma.task.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    });
    await prisma.activity.create({
      data: {
        type: "TASK_UPDATED",
        userId: session.user.id,
        groupId: user.groupId,
      },
    });
    revalidatePath("/tasks", 'page');
  } catch (error: any) {
    console.error("Error details:", error);
    throw new Error(`Failed to create task: ${error.message}`);
  }
}
