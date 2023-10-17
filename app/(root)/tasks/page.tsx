import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TaskCard from "@/components/cards/TaskCard";
import Task from "@/components/forms/Task";
import { fetchGroupTasks } from "@/lib/actions/task.actions";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const groupIdPrisma = session?.user?.groupId || undefined;

  const tasks = await fetchGroupTasks({ groupIdPrisma });
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start">
      <section className="bg-dark-2 p-10">
        <Task session={session} />
      </section>
      <section className="mt-9 flex flex-col gap-10">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            task={task.task}
            status={task.status}
            author={{
              name: task.author.name || "Unknown",
              image: task.author.image || "DefaultImageURL",
              id: task.author.id,
            }}
          />
        ))}
      </section>
    </main>
  );
}
