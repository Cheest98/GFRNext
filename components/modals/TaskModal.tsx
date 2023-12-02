"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { deleteTask, updateTask } from "@/lib/actions/task.actions";
import { formatDateString } from "@/lib/utils";
import { Session } from "next-auth";
import DeleteButton from "../shared/DeleteButton";
import TaskButton from "../shared/TaskButton";

interface Task {
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
    onClose: () => void;
    src: string;
    alt:string
  }

 function TaskModal({ id, task, author, status, description, createdAt, session, src, alt, onClose }: Task) {

    return (
        <Dialog open={true} onOpenChange={onClose}>
          <DialogContent className="rounded-lg bg-dark-4" >
            <DialogHeader>
              <DialogTitle className="text-1.5rem font-semibold text-light-1">{task} <p className='text-subtle-medium text-gray-1'>{formatDateString(createdAt)}</p> </DialogTitle>
               
            </DialogHeader>
            <DialogDescription>
           <p className="text-light-1"> {description}</p>
          </DialogDescription>
        <div className="grid gap-4 py-4">
        <div className="mt-auto flex items-center gap-3">
  
</div>


        </div>
            <DialogFooter>
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
                          <DeleteButton
              session={session}
                data={{ id}}
                action={deleteTask}
                src= {src}
                alt= {alt}
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }

export default TaskModal;
