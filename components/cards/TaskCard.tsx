import { deleteTask, updateTask } from "@/lib/actions/task.actions";
import { Session } from "next-auth";
import TaskButton from "../shared/TaskButton";
import { Button } from "../ui/button";
import Image from "next/image";
import { formatDateString } from "@/lib/utils";
import profilePicPlaceholder from "../../public/assets/profile-pic-placeholder.png";
import DeleteButton from "../shared/DeleteButton";


interface TaskCardProps {
  session: Session | null;
  id: string;
  task: string;
  description: string;
  status: string;
  createdAt: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
}

function TaskCard({ id, task, author, status, description, createdAt,  session }: TaskCardProps) {

  const authorImage = author.image ? author.image : profilePicPlaceholder;
  return (
<article className="p-5 rounded-lg bg-dark-2   border-r-dark-1 flex flex-col gap-2 h-64">
<div className='flex w-full flex-col justify-between'>  
            <div className='flex justify-between'>
            <h1 className="text-1.5rem font-semibold text-light-1">{task}</h1>
            <div>
            <DeleteButton
              session={session}
                data={{ id}}
                action={deleteTask}
              />
              </div>
            </div>
      </div>
      <p className="text-light-1">{description}</p>
      
      <div className="mt-auto flex items-center gap-3">
  
            {status === "To do" && (
              <TaskButton
              session={session}
                data={{ id, status: "Doing", session }}
                action={updateTask}
                label="Doing"
              />
            )}
            {status === "Doing" && (
              <TaskButton
              session={session}
                data={{ id, status: "Done", }}
                action={updateTask}
                label="Done"
              />
            )}
            {status === "Done" && (
              <p className="text-light-1"> Task completed at: {description}</p>
            )}
      </div>
      <div>
            </div>
            <div className='h-0.5 w-full bg-dark-3' />
           <div className='mt-2 flex justify-between items-center'>
        <p className='text-subtle-medium text-gray-1'>{author.name}</p>
        <p className='text-subtle-medium text-gray-1'>{formatDateString(createdAt)}</p>
      </div>
  

    </article>
  );
}

export default TaskCard;
