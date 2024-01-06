import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import List from "@/components/forms/List";
import ListTab from "@/components/shared/ListTab";
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

  <section>
    <ListTab session={session} lists={lists}/>
  </section>
  </main>
  );
}
