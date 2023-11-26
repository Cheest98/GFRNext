"use server";

import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
import { prisma } from "../db/prisma";

interface CreatePostProps {
  session: Session | null;
  data: {
    picturePath: string;
    content: string;
  };
}

interface groupProps {
  groupIdPrisma: string | undefined;
}

interface userProps {
  authorId: string | undefined;
}


export async function createPost({
  session,
  data,
}: CreatePostProps): Promise<void> {
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
    const newPost = await prisma.post.create({
      data: {
        picturePath: data.picturePath,
        content: data.content,
        authorId: session.user.id,
        groupId: user.groupId,
      },  
    });
    await prisma.activity.create({
      data: {
        type: "POST_CREATED",
        userId: session.user.id,
        groupId: user.groupId,
      },
    });
    console.log(newPost);
    revalidatePath("/");
  } catch (error: any) {
    throw new Error(`Failed to create post: ${error.message}`);
  }
}

export async function fetchGroupPosts({ groupIdPrisma }: groupProps) {
  try {
    const posts = await prisma.post.findMany({
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
    return posts;
  } catch (error: any) {
    throw new Error(`Failed to fetch post: ${error.message}`);
  }
}

export async function fetchUserPosts({ authorId }: userProps) {
  try {
    const posts = await prisma.post.findMany({
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
    return posts;
  } catch (error: any) {
    throw new Error(`Failed to fetch user post: ${error.message}`);
  }
}
