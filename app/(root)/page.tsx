import Post from "@/components/forms/Post";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";
import PostCard from "@/components/cards/PostCard";
import { fetchGroupPosts } from "@/lib/actions/post.actions";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { prisma } from "@/lib/db/prisma";

const posts = [
  {
    id: "65142568c592bef7f2b1e3c8",
    content: "Test",
    authorId: "6508c7819ce58cceec142343",
    author: {
      name: "test1",
      image: "test2",
      id: "6508c7819ce58cceec142343",
    },
    groupId: "65142379c592bef7f2b1e3c7",
  },
  {
    id: "65142568c592bef7f2b1e3c8",
    content: "Test",
    authorId: "6508c7819ce58cceec142343",
    author: {
      name: "test1",
      image: "test2",
      id: "6508c7819ce58cceec142343",
    },
    groupId: "65142379c592bef7f2b1e3c7",
  },
];

export default async function Home() {
  const session = await getServerSession(authOptions);
  const groupIdPrisma = session?.user?.groupId || undefined;

  const test = await fetchGroupPosts({ groupIdPrisma });

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start">
      <section className="bg-dark-2 p-10">
        <Post session={session} />
      </section>
      <section className="mt-9 flex flex-col gap-10">
        {test.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            content={post.content}
            author={{
              name: post.author.name || "Unknown",
              image: post.author.image || "DefaultImageURL",
              id: post.author.id,
            }}
          />
        ))}
      </section>
    </main>
  );
}
