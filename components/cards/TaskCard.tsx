import { updateTask } from "@/lib/actions/task.actions";
import TaskButton from "../shared/TaskButton";

interface TaskCardProps {
  id: string;
  task: string;
  status: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
}

function TaskCard({ id, task, author, status }: TaskCardProps) {
  return (
    <article className="flex w-full flex-col rounded-xl">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <h4 className="cursor-pointer text-base-semibold text-light-1">
              {author.name}
            </h4>
            <p className="mt-2 text-small-regular text-light-2">{task}</p>
            <p className="mt-2 text-small-regular text-light-2">{status}</p>
          </div>
          <div>
            {status !== "To do" && (
              <TaskButton
                data={{ id, status: "To do" }}
                action={updateTask}
                label="To do"
              />
            )}
            {status !== "Doing" && (
              <TaskButton
                data={{ id, status: "Doing" }}
                action={updateTask}
                label="Doing"
              />
            )}
            {status !== "Done" && (
              <TaskButton
                data={{ id, status: "Done" }}
                action={updateTask}
                label="Done"
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;