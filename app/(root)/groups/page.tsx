import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import GroupHeaderSkeleton from "@/components/Skeletons/GroupHeaderSkeleton";
import GroupHeader from "@/components/cards/GroupHeader";
import { getServerSession } from "next-auth";

async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <section>
        <GroupHeader session={session} />
      </section>
      <section className="mt-9 bg-dark-2 p-10 rounded-lg">
        <p className="text-light-2 max-sm:hidden"> Component with group members</p>
      </section>
    </main>
  );
}

export default Page;
