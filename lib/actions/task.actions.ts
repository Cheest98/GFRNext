"use server";

import { Session } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "../db/prisma";

interface CreateTaskProps {
  session: Session | null;
  data: {
    task: string;
    description: string;
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

interface deleteTaskProps {
  session: Session | null;
  data: {
    id: string;
  };
}

interface userProps {
  authorId: string | undefined;
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
        description: data.description,
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
    revalidateTag('tasks')
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
        updatedAt: "desc",
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

export async function deleteTask({ data, session }: deleteTaskProps): Promise<void> {
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
    await prisma.task.delete({
      where: {
        id: data.id,
      },
    });
  
    await prisma.activity.create({
      data: {
        type: "TASK_DELETED",
        userId: session.user.id,
        groupId: user.groupId,
      },
    });
    console.log("Task", data.id,  "has been removed ")
    revalidatePath("/tasks", 'page');
  } catch (error: any) {
    console.error("Error details:", error);
    throw new Error(`Failed to DELETE task: ${error.message}`);
  }
}

export async function fetchUserTasks({ authorId }: userProps) {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        authorId: authorId,
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
    throw new Error(`Failed to fetch user post: ${error.message}`);
  }
}

