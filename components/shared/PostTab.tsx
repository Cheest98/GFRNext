
import { fetchUserPosts } from "@/lib/actions/post.actions";
import { Session } from "next-auth";
import PostCard from "../cards/PostCard";


interface UserProps {
    session: Session | null;
  }
  

async function PostTab({ session }: UserProps) {

  const authorId = session?.user?.id; // Changed from groupId to id

  let userPosts;
  try {
    userPosts = await fetchUserPosts({ authorId });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return <p>Error fetching posts</p>; // Display error message
  }

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {userPosts.map((post) => (
        <PostCard
            key={post.id}
            id={post.id}
            content={post.content}
            picturePath={post.picturePath}
            createdAt={post.createdAt.toISOString()}
            author={{
              name: post.author.name || "Unknown",
              image: post.author.image,
              id: post.author.id,
            }}
          />
      ))}
    </section>
  );
}

export default PostTab;