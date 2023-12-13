"use server";

import { Session } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "../db/prisma";

interface ListProps {
  session: Session | null;
  data: {
    list: string;
  };
}

interface groupProps {
  groupIdPrisma: string | undefined;
}

interface ProductProps {
  listId: string;
  data: {
    product: string;
  };
}
interface ProductListProps {
  listId: string;
}

interface UpdateListProps {
  session: Session | null;
  data: {
    id: string;
    status: string;
  };
}

export async function createList({ session, data }: ListProps): Promise<void> {
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
    await prisma.activity.create({
      data: {
        type: "LIST_CREATED",
        userId: session.user.id,
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

export async function createProduct({
  listId,
  data,
}: ProductProps): Promise<void> {
  if (!listId) {
    throw new Error("List ID is missing");
  }

  const list = await prisma.list.findUnique({
    where: { id: listId },
  });

  try {
    const newProduct = await prisma.product.create({
      data: {
        product: data.product,
        status: "Not Completed",
        listid: listId,
      },
      
    });
    console.log(newProduct);
    revalidateTag('products')
  } catch (error: any) {
    throw new Error(`Failed to create post: ${error.message}`);
  }
}


export async function updateList({ data, session }: UpdateListProps): Promise<void> {
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
    await prisma.list.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    });
    await prisma.activity.create({
      data: {
        type: "LIST_UPDATED",
        userId: session.user.id,
        groupId: user.groupId,
      },
    });
  } catch (error: any) {
    console.error("Error details:", error);
    throw new Error(`Failed to create task: ${error.message}`);
  }
}

export async function fetchListProducts({ listId }: ProductListProps) {
  try {
    const product = await prisma.product.findMany({
      where: {
        listid: listId,
      },
    });

    return product;
  } catch (error: any) {
    throw new Error(`Failed to fetch post: ${error.message}`);
  }
}