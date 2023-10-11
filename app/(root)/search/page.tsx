import { prisma } from "@/lib/db/prisma";
import React from "react";

interface SearchPageProps {
  searchParams: { query: string };
}

export default async function searchParams({
  searchParams: { query },
}: SearchPageProps) {
  const group = await prisma.group.findMany({
    where: {
      name: { contains: query, mode: "insensitive" },
    },
    orderBy: { id: "desc" },
  });

  if (group.length === 0) {
    return (
      <div className="mt-2 text-small-regular text-light-2">
        No groups found
      </div>
    );
  }
  return (
    <div>
      {group.map((group) => (
        <div className="mt-2 text-small-regular text-light-2">{group.name}</div>
      ))}
    </div>
  );
}
