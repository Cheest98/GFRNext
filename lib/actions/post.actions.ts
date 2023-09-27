"use server";

import { Session } from "next-auth";
import { prisma } from "../db/prisma";

interface CreatePostProps {
  session: Session | null;
  data: {
    picturePath: string;
    content: string;
  };
}

interface FetchPostsProps {
  session: Session | null;
}
type PostType = {
  id: string;
  content: string;
  picturePath: string | null;
  authorId: string;
  groupId: string;
};

export async function createPost({
  session,
  data,
}: CreatePostProps): Promise<void> {
  if (!session?.user?.id) {
    throw new Error("User ID is missing.");
  }

  // Fetch the user from the database to get the groupId
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
    console.log(newPost);
  } catch (error: any) {
    throw new Error(`Failed to create post: ${error.message}`);
  }
}

export async function fetchGroupPosts({
  session,
}: FetchPostsProps): Promise<PostType[]> {
  if (!session?.user?.id) {
    throw new Error("User ID is missing.");
  }

  // Fetch the user from the database to get the groupId
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { groupId: true }, // Only select the groupId for efficiency
  });

  if (!user || !user.groupId) {
    throw new Error("User's group ID is missing.");
  }

  // Fetch posts associated with the user's group
  const groupPosts = await prisma.post.findMany({
    where: {
      groupId: user.groupId,
    },
  });

  return groupPosts;
}
