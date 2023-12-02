
import { fetchUserTasks } from "@/lib/actions/task.actions";
import { Session } from "next-auth";
import TaskCard from "../cards/TaskCard";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { tasksTabs } from "@/app/constants";
import Image from "next/image";

interface UserProps {
    session: Session | null;
  }
  

async function PostTab({ session }: UserProps) {

  const authorId = session?.user?.id; // Changed from groupId to id

  let userTasks;
  try {
    userTasks = await fetchUserTasks({ authorId });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return <p>Error fetching tasks</p>; // Display error message
  }

  const todoTasks = userTasks.filter(task => task.status === 'To do');
  const doingTasks = userTasks.filter(task => task.status === 'Doing');
  const doneTasks = userTasks.filter(task => task.status === 'Done');

  return (
    <section className='mt-2flex flex-col gap-10'>
      <div className='mt-9'>
        <Tabs defaultValue='posts' className='w-full bg-dark-2 rounded-lg'>
          <TabsList className='tab rounded-lg flex justify-center gap-4 bg-dark-2'>
            {tasksTabs.map((tab) => (
              <div className='tab flex items-center justify-center gap-2'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p className='max-sm:hidden'>{tab.label}</p>
                </div>

              
            ))}
          </TabsList>
        </Tabs>
      </div>
    <section className="mt-9 mb-1 grid grid-cols-3 gap-4">
      <div  className="flex flex-col gap-4" >
        {todoTasks.map(task => (
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
              image: task.author.image || "DefaultImageURL",
              id: task.author.id,
            }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {doingTasks.map(task => (
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
              image: task.author.image || "DefaultImageURL",
              id: task.author.id,
            }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {doneTasks.map(task => (
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
              image: task.author.image || "DefaultImageURL",
              id: task.author.id,
            }}
          />
        ))}
      </div>
    </section>
    </section>
  );
}

export default PostTab;