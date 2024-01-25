import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { tasksTabs } from "@/app/constants";
import TaskCard from "@/components/cards/TaskCard";
import Task from "@/components/forms/Task";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { fetchGroupTasks } from "@/lib/actions/task.actions";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const groupIdPrisma = session?.user?.groupId || undefined;

  const tasks = await fetchGroupTasks({ groupIdPrisma });

  const todoTasks = tasks.filter((task) => task.status === "To do");
  const doingTasks = tasks.filter((task) => task.status === "Doing");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start">
      <section className="bg-dark-2 p-10 rounded-lg">
        <Task session={session} />
      </section>

      <div className="mt-9">
        <Tabs defaultValue="posts" className="w-full bg-dark-2 rounded-lg">
          <TabsList className="tab rounded-lg flex justify-center gap-4 bg-dark-2">
            {tasksTabs.map((tab) => (
              <div className="tab flex items-center justify-center gap-2">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>
              </div>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <section className="mt-9 mb-1 grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-4">
          {todoTasks.map((task) => (
            <TaskCard
              session={session}
              key={task.id}
              id={task.id}
              task={task.task}
              description={task.description || "Brak"}
              status={task.status}
              createdAt={task.createdAt.toISOString()}
              author={{
                name: task.author.name || "Unknown",
                userImage: task.author.userImage || "DefaultImageURL",
                id: task.author.id,
              }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {doingTasks.map((task) => (
            <TaskCard
              session={session}
              key={task.id}
              id={task.id}
              task={task.task}
              description={task.description || "Brak"}
              status={task.status}
              createdAt={task.createdAt.toISOString()}
              author={{
                name: task.author.name || "Unknown",
                userImage: task.author.userImage || "DefaultImageURL",
                id: task.author.id,
              }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {doneTasks.map((task) => (
            <TaskCard
              session={session}
              key={task.id}
              id={task.id}
              task={task.task}
              description={task.description || "Brak"}
              status={task.status}
              createdAt={task.createdAt.toISOString()}
              author={{
                name: task.author.name || "Unknown",
                userImage: task.author.userImage || "DefaultImageURL",
                id: task.author.id,
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
