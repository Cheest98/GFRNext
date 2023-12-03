"use client"

import { deleteTask, updateTask } from "@/lib/actions/task.actions";
import { formatDateString } from "@/lib/utils";
import { Session } from "next-auth";
import { useState } from "react";
import profilePicPlaceholder from "../../public/assets/profile-pic-placeholder.png";
import TaskModal from "../modals/TaskModal";
import DeleteButton from "../shared/DeleteButton";
import StatusButton from "../shared/StatusButton";


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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const authorImage = author.image ? author.image : profilePicPlaceholder;
  return (
    <>
<article className="p-5 rounded-lg bg-dark-2   border-r-dark-1 flex flex-col gap-2 h-64">
<div className='flex w-full flex-col justify-between'>  
            <div className='flex justify-between'>
            <h1 className="text-1.5rem font-semibold text-light-1">{task}</h1>
            <div>
            <DeleteButton
              session={session}
                data={{ id}}
                action={handleTaskClick}
                src= "/assets/edit.svg"
                alt= "Edit"
              />
                          <DeleteButton
              session={session}
                data={{ id}}
                action={deleteTask}
                src= "/assets/delete.svg"
                alt= "Trash"
              />
              </div>
            </div>
      </div>
      <p className="text-light-1">{description}</p>
      
      <div className="mt-auto flex items-center gap-3">
  
            {status === "To do" && (
              <StatusButton
              session={session}
                data={{ id, status: "Doing", session }}
                action={updateTask}
                label="Doing"
              />
            )}
            {status === "Doing" && (
              <StatusButton
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
    {isModalOpen && (
        <TaskModal  
        session={session}           
        id={id}
        task={task}
        description={description || "Brak"}
        status={status}
        createdAt={createdAt}
        author={{
          name: author.name || "Unknown",
          image: author.image || "DefaultImageURL",
          id: author.id,
        }} 
        onClose={handleCloseModal}
        src= "/assets/delete.svg"
        alt= "Trash"
        />
      )}
    </>
  );
}

export default TaskCard;
