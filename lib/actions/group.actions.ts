"use server";

import { Session } from "next-auth";
import { prisma } from "../db/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { getSession } from "next-auth/react";
import { redirect } from 'next/navigation'

interface CreateGroupProps {
  session: Session | null;
  data: {
    name: string;
    description: string;
    password: string;
  };
}
interface recentActivitiesProps {
  groupId: string | null
}

interface upcomingEventsProps {
  groupId: string | null
}

interface groupActivitiesProps {
  groupIdPrisma: string;
}


interface getGroupInfoProps {
  groupIdPrisma: string | undefined;
}

interface UpdateGroupProps {
  session: Session | null;
  data: {
    groupImage?: string;
    name?: string;
    description?: string;
  };
}

interface JoinGroupProps {
  session: Session | null;
  data: {
    joinGroupId: string;
    password: string;
  };
}

interface groupMemebersProps {
  groupIdPrisma: string | undefined;
}

export async function createGroup({
  session,
  data,
}: CreateGroupProps): Promise<void> {
  console.log(data)
  if (!session?.user?.id) {
    throw new Error("User ID is missing.");
  }
  if (!data.password || typeof data.password !== 'string' || data.password.length < 3) {
    throw new Error("Invalid password. Password must be at least 3 characters long.");
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
        password: data.password,
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

    await getSession();
    console.log("New group created:", newGroup);
    revalidatePath("/groups")
    revalidateTag('activities')
  } catch (error: any) {
    console.error("Failed to create group:", error);
    throw new Error(`Failed to create group: ${error.message}`);
  }
}

export async function joinGroup({
  session,
  data
}: JoinGroupProps): Promise<void> {
  if (!session?.user?.id) {
    throw new Error("User ID is missing.");
  }


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


  // TODO - ADD toast resposne
  try {
    const groupToJoin = await prisma.group.findUnique({
      where: {
        id: data.joinGroupId,
      },
    });

    if (!groupToJoin) {
      throw new Error("Group not found.");
    }

    if (groupToJoin.password !== data.password) {
      throw new Error("Invalid password. Please try again.");
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        groupId: data.joinGroupId,
      },
    });

    await prisma.activity.create({
      data: {
        type: "GROUP_LEFT",
        userId: session.user.id,
        groupId: existingGroup.id,
      },
    });
    console.log(`User ${session.user.id} joined group: ${data.joinGroupId}`);


    revalidateTag('activities')
  } catch (error: any) {
    console.error("Failed to join group:", error);
    throw new Error(`Failed to join group: ${error.message}`);
  }
}

export async function getGroupInfo({ groupIdPrisma }: getGroupInfoProps) {
  if (!groupIdPrisma) {
    throw new Error("Group ID is missing.");
  }

  try {
    const groupInfo = prisma.group.findUnique({
      where: { id: groupIdPrisma },
      select: {
        name: true,
        description: true,
        groupImage: true,
        ownerId: true,
      }
    });
    return groupInfo;
  } catch (error: any) {
    throw new Error(`Failed to fetch group info: ${error.message}`);
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

export async function fetchGroupActivities({ groupIdPrisma, skip = 0, take = 15 }: groupActivitiesProps & { skip?: number; take?: number }) {
  if (!groupIdPrisma) {
    throw new Error("Group ID is missing.");
  }

  try {
    const [activities, totalCount] = await prisma.$transaction([
      prisma.activity.findMany({
        where: { groupId: groupIdPrisma },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: { user: true },
      }),
      prisma.activity.count({
        where: { groupId: groupIdPrisma },
      }),
    ]);
  
    return { activities, totalCount };
  } catch (error: any) {
    throw new Error(`Failed to fetch activities: ${error.message}`);
  }
}

export async function updateGroup({
  session,
  data,
}: UpdateGroupProps): Promise<{ success: boolean; message: string }> {
  // Filter out undefined fields
  const updateData: Partial<typeof data> = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined)
  );
  const groupIdPrisma = session?.user.groupId;
  if (!groupIdPrisma) {
    throw new Error("Group ID is missing.");
  }

  try {
    await prisma.group.update({
      where: {
        id: groupIdPrisma,
      },
      data: updateData,
    });
    return { success: true, message: "Group updated successfully" };
  } catch (error) {
    console.error("Error details:", error);
    return { success: false, message: "Failed to update group, please try again" };
  }
}

export async function fetchGroupMembers({ groupIdPrisma }: groupMemebersProps) {
  if (!groupIdPrisma) {
    throw new Error("Group ID is missing.");
  }
  try {
    const groupMembers = await prisma.user.findMany({
      where: {
        groupId: groupIdPrisma,
      },
      select: {
        id: true,
        name: true,
        userImage: true,
        tasks: {
          where: { groupId: groupIdPrisma },
          select: {
            id: true,
          },
        },
        posts: {
          where: { groupId: groupIdPrisma },
          select: {
            id: true,
          },
        },
        lists: {
          where: { groupId: groupIdPrisma },
          select: {
            id: true,
          },
        },
        event: {
          where: { groupId: groupIdPrisma },
          select: {
            id: true,
          },
        },
      },
    });

    return groupMembers;

  } catch (error: any) {
    throw new Error(`Failed to fetch activities: ${error.message}`);
  }}


  export async function fetchUpcomingEvents({ groupId }: upcomingEventsProps) {
    if (!groupId) {
      throw new Error("Group ID is missing.");
    }
    const currentDate = new Date();
  
    try {
      const events = prisma.event.findMany({
        where: {
          groupId,
          start: {
            gte: currentDate, 
          },
        },
        take: 5, 
      });
      return events;
    } catch (error: any) {
      throw new Error(`Failed to fetch activities: ${error.message}`);
    }
  }