"use server";

import { Session } from "next-auth";
import { revalidateTag } from "next/cache";
import { prisma } from "../db/prisma";


interface CreateEventProps {
    session: Session | null;
    data: {
        title: string;
        description: string;
        date: string;
        time: string
        allDay: boolean;
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

interface SingleEventProps {
    eventId: string;
}

interface UpdateEventProps {
    data: {
        id: string;
        title: string;
        description: string;
        date: string;
        time: string
        allDay: boolean;
    };
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
    const combinedDateTime = `${data.date}T${data.time}:00.000Z`;

    console.log("Data ", new Date(data.date))

    console.log("Total: ", data)

    try {
        const newEvent = await prisma.event.create({
            data: {
                title: data.title,
                description: data.description,
                start: combinedDateTime,
                allDay: data.allDay,
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
        revalidateTag('events');
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

export async function getEventInfo({ eventId }: SingleEventProps) {
    // Filter out undefined fields
    if (!eventId) {
        throw new Error("Event ID is missing.");
    }

    try {
        const event = await prisma.event.findUnique({
            where: { id: eventId },
            select: {
                id: true,
                title: true,
                description: true,
                start: true,
                allDay: true,

            }
        });
        return event;
    } catch (error: any) {
        console.error("Error details:", error);
        throw new Error(`Failed to DELETE Event: ${error.message}`);
    }
}

export async function updateEvent({ data }: UpdateEventProps): Promise<void> {
    const combinedDateTime = `${data.date}T${data.time}:00.000Z`;
    try {
        await prisma.event.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
                description: data.description,
                start: combinedDateTime,
                allDay: data.allDay,
            },
        });

        console.log("Event", data.id, "has been updated");
        revalidateTag('events')
    } catch (error: any) {
        console.error("Error details:", error);
        throw new Error(`Failed to UPDATE Event: ${error.message}`);
    }
}
