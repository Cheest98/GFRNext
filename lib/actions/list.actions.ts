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

interface UpadteProductStatusProps {
  productId: string;
  newStatus: string;
}

interface DeleteProductProps {
  productId: string;
}

interface DeleteListProps {
  session: Session | null;
  data: {
    id: string;
  };
}


interface UpdateListProps {
  session: Session | null;
  data: {
    id: string;
    status: string;
    price: number | null;
  };
}

interface userProps {
  authorId: string | undefined;
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

    let updateData: { status: string; price?: number } = { status: data.status };

    if (data.price !== null && data.price !== undefined) {
      updateData.price = typeof data.price === 'number' ? data.price : parseFloat(data.price);
    }

    await prisma.list.update({
      where: { id: data.id },
      data: updateData
    });
    await prisma.activity.create({
      data: {
        type: "LIST_UPDATED",
        userId: session.user.id,
        groupId: user.groupId,
      },
    });

    revalidatePath("/lists", 'page');
  } catch (error: any) {
    console.error("Error details:", error);
    throw new Error(`Failed to update list: ${error.message}`);
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
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
}

export async function updateProductStatus({ productId, newStatus }: UpadteProductStatusProps) {

  if (!productId) {
    throw new Error("Product ID is missing.");
  }

  try {
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        status: newStatus,
      },
    });
  }
  catch (error: any) {
    console.error("Error details:", error);
    throw new Error(`Failed to update product: ${error.message}`);
  }
}

export async function deleteProduct({ productId }: DeleteProductProps) {

  if (!productId) {
    throw new Error("Product ID is missing.");
  }

  try {
    await prisma.product.delete({
      where: {
        id: productId,
      },

    });
  }
  catch (error: any) {
    console.error("Error details:", error);
    throw new Error(`Failed to delete product: ${error.message}`);
  }
}

export async function deleteList({ data, session }: DeleteListProps) {
  console.log(data)
  if (!session?.user?.id) {
    throw new Error("User ID is missing.");
  }

  if (!data.id) {
    throw new Error("List ID is missing.");
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user || !user.groupId) {
    throw new Error("User's group ID is missing.");
  }

  try {
    await prisma.list.delete({
      where: {
        id: data.id,
      },

    });
    await prisma.activity.create({
      data: {
        type: "LIST_REMOVED",
        userId: session.user.id,
        groupId: user.groupId,
      },
    });
    revalidatePath("/shopping");
  } catch (error: any) {
    console.error("Error details:", error);
    throw new Error(`Failed to delete List: ${error.message}`);
  }
}

export async function fetchUserList({ authorId }: userProps) {
  try {
    const list = await prisma.list.findMany({
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
    return list;
  } catch (error: any) {
    throw new Error(`Failed to fetch user post: ${error.message}`);
  }
}
