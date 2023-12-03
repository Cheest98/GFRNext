import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ListCard from "@/components/cards/ListCard";
import List from "@/components/forms/List";
import { fetchGroupLists } from "@/lib/actions/list.actions";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const groupIdPrisma = session?.user?.groupId || undefined;

  const lists = await fetchGroupLists({ groupIdPrisma });
  
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start">
      <section className="bg-dark-2 p-10 rounded-lg">
        <List session={session} />
      </section>
      <section className="mt-9  flex flex-col gap-10">
        {lists.map((list) => (
          <ListCard
            key={list.id}
            id={list.id}
            list={list.list}
            status={list.status}
            session={session}
            author={{
              name: list.author.name || "Unknown",
              image: list.author.image || "DefaultImageURL",
              id: list.author.id,
            }}
          />
        ))}
      </section>
    </main>
  );
}
