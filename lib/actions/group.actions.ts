"use server";

import { Session } from "next-auth";
import { prisma } from "../db/prisma";

interface CreateGroupProps {
  session: Session | null;
  data: {
    name: string;
    description: string;
  };
}
interface recentActivitiesProps {
  groupId: string | null
}

export async function createGroup({
  session,
  data,
}: CreateGroupProps): Promise<void> {
  if (!session?.user?.id) {
    throw new Error("User ID is missing.");
  }

  // Check if the user is already a member of another group
  const existingGroup = await prisma.group.findFirst({
    where: {
      members: {
        some: {
          id: session.user.id,
        },
      },
    },
    include: {
      members: true,
    },
  });
  if (!existingGroup) {
    throw new Error("Group ID is missing.");
  }


  if (existingGroup) {
    // If the user is the last member of the group
    if (existingGroup.members.length === 1) {
      await prisma.group.delete({
        where: {
          id: existingGroup.id,
        },
      });
    } else {
      // If there are other members, set the next user as the owner
      const nextOwner = existingGroup.members.find(
        (member) => member.id !== session.user.id
      );
      if (nextOwner) {
        await prisma.group.update({
          where: {
            id: existingGroup.id,
          },
          data: {
            ownerId: nextOwner.id,
          },
        });
      }
    }
  }

  // Proceed to create the new group
  try {
    const newGroup = await prisma.group.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId: session.user.id,
        members: {
          connect: { id: session.user.id },
        },
      },
    });
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        groupId: newGroup.id,
      },
    });
    await prisma.activity.create({
      data: {
        type: "GROUP_LEFT",
        userId: session.user.id,
        groupId: existingGroup.id,
      },
    });
    console.log(newGroup);
  } catch (error: any) {
    throw new Error(`Failed to create group: ${error.message}`);
  }
}

export async function joinGroup({
  session,
  joinGroupId,
}: {
  session: Session | null;
  joinGroupId: string;
}): Promise<void> {
  if (!session?.user?.id) {
    throw new Error("User ID is missing.");
  }
  

  // Check if the user is already a member of another group
  const existingGroup = await prisma.group.findFirst({
    where: {
      members: {
        some: {
          id: session.user.id,
        },
      },
    },
    include: {
      members: true,
    },
  });
  if (!existingGroup) {
    throw new Error("Group ID is missing.");
  }

  if (existingGroup) {
    // If the user is the last member of the group
    if (existingGroup.members.length === 1) {
      await prisma.group.delete({
        where: {
          id: existingGroup.id,
        },
      });
    } else {
      // If there are other members, set the next user as the owner
      const nextOwner = existingGroup.members.find(
        (member) => member.id !== session.user.id
      );
      if (nextOwner) {
        await prisma.group.update({
          where: {
            id: existingGroup.id,
          },
          data: {
            ownerId: nextOwner.id,
          },
        });
      }
    }
  }

  // Proceed to join the group
  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        groupId: joinGroupId,
      },
    });

    await prisma.activity.create({
      data: {
        type: "GROUP_LEFT",
        userId: session.user.id,
        groupId: existingGroup.id,
      },
    });
    console.log(`User joined group: ${joinGroupId}`);
  } catch (error: any) {
    throw new Error(`Failed to join group: ${error.message}`);
  }
}

export async function fetchRecentActivities({ groupId }: recentActivitiesProps) {
  if (!groupId) {
    throw new Error("Group ID is missing.");
  }
  
  try {
    const activities = prisma.activity.findMany({
    where: { 
      groupId
     },
    orderBy: { 
      createdAt: 'desc' 
    },
    take: 5, // Fetch the 5 lastets activities
    include: { 
      user: true 
    }, // Include user information
  });
  return activities;
} catch (error: any) {
  throw new Error(`Failed to fetch activities: ${error.message}`);
}
}