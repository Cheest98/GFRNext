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

  return (
    <section>
      <div className="mt-14 flex flex-col gap-9">
        {group.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {group.map((group) => (
              <div className="mt-2 text-small-regular text-light-2">
                {group.name}
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
