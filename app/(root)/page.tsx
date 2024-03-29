import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PostCard from "@/components/cards/PostCard";
import Post from "@/components/forms/Post";
import { fetchGroupPosts } from "@/lib/actions/post.actions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const groupIdPrisma = session?.user?.groupId || undefined;
  console.log("session", session);

  const test = await fetchGroupPosts({ groupIdPrisma });

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start">
      <section className="bg-dark-2 p-10 rounded-lg">
        <Post session={session} />
      </section>
      <section className="mt-9 flex flex-col gap-10">
        {test.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            content={post.content}
            picturePath={post.picturePath}
            createdAt={post.createdAt.toISOString()}
            author={{
              name: post.author.name || "Unknown",
              userImage: post.author.userImage,
              id: post.author.id,
            }}
          />
        ))}
      </section>
    </main>
  );
}
