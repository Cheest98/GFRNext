"use server";

import { Session } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "../db/prisma";


interface CreateEventProps {
    session: Session | null;
    data: {
        title: string;
        description: string;
        start: string
        end: string
        allDay: Boolean
    };
}

interface deleteEventProps {
    session: Session | null;
    data: {
        id: string;
    };
}

interface userProps {
    authorId: string | undefined;
}

interface groupProps {
    groupIdPrisma: string | undefined;
}

export async function createEvent({
    session,
    data,
}: CreateEventProps): Promise<void> {
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
        const newEvent = await prisma.event.create({
            data: {
                title: data.title,
                description: data.description,
                start: data.start,
                end: data.start,
                authorId: session.user.id,
                groupId: user.groupId,
            },
        });
        await prisma.activity.create({
            data: {
                type: "EVENT_CREATED",
                userId: session.user.id,
                groupId: user.groupId,
            },
        });
        console.log(newEvent);
        revalidateTag('events')
    } catch (error: any) {
        throw new Error(`Failed to create EVENT: ${error.message}`);
    }
}


export async function deleteEvent({ data, session }: deleteEventProps): Promise<void> {
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
        await prisma.event.delete({
            where: {
                id: data.id,
            },
        });

        await prisma.activity.create({
            data: {
                type: "EVENT_DELETED",
                userId: session.user.id,
                groupId: user.groupId,
            },
        });
        console.log("Event", data.id, "has been removed ")
        revalidatePath("/event", 'page');
    } catch (error: any) {
        console.error("Error details:", error);
        throw new Error(`Failed to DELETE Event: ${error.message}`);
    }
}

export async function fetchUserEvents({ authorId }: userProps) {
    try {
        const event = await prisma.event.findMany({
            where: {
                authorId: authorId,
            },
            include: {
                author: true,
            },
        });
        return event;
    } catch (error: any) {
        throw new Error(`Failed to fetch user post: ${error.message}`);
    }
}

export async function fetchGroupEvents({ groupIdPrisma }: groupProps) {
    try {
        const events = await prisma.event.findMany({
            where: {
                groupId: groupIdPrisma,
            },
            include: {
                author: true,
            },
        });

        return events;
    } catch (error: any) {
        throw new Error(`Failed to fetch events: ${error.message}`);
    }
}
