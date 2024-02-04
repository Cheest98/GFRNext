import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import GroupHeaderSkeleton from "@/components/Skeletons/GroupHeaderSkeleton";
import GroupHeader from "@/components/cards/GroupHeader";
import UserCard from "@/components/cards/UserCard";
import { fetchGroupMembers } from "@/lib/actions/group.actions";
import { getServerSession } from "next-auth";

async function Page() {
  const session = await getServerSession(authOptions);
  const groupIdPrisma = session?.user?.groupId || undefined;

  const groupMembers = await fetchGroupMembers({ groupIdPrisma });
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <section>
        <GroupHeader session={session} />
      </section>
      <section>
      {groupMembers.map((member) => (
            <UserCard
              key={member.id}
              id={member.id}
              userName={(member.name || "Unknown").substring(0, 10)}
              userImage={member.userImage}
              tasks={member.tasks.length}
              posts={member.posts.length}
              lists={member.lists.length}
              events={member.event.length}
            />
      ))}
      </section>
    </main>
  );
}

export default Page;
