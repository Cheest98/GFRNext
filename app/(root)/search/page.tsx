import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import JoinButton from "@/components/shared/JoinButton";
import { joinGroup } from "@/lib/actions/group.actions";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";

interface SearchPageProps {
  searchParams: { query: string };
}

export default async function searchParams({
  searchParams: { query },
}: SearchPageProps) {
  const session = await getServerSession(authOptions);
  const group = await prisma.group.findMany({
    where: {
      name: { contains: query, mode: "insensitive" },
    },
    orderBy: { id: "desc" },
  });
  // TODO
  //add groupcomponent and password modal
  return (
    <section>
      <div className="mt-14 flex flex-col gap-9">
        {group.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {group.map((group) => (
              <div
                className="flex gap-1 rounded-lg bg-dark-3 px-4 py-2 mt-2"
                key={group.id}
              >
                <div className="text-small-regular text-light-2">
                  {group.name}
                </div>
                <JoinButton
                  session={session}
                  joinGroupId={group.id}
                  action={joinGroup}
                  label="Join"
                />
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
