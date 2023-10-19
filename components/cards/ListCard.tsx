import { updateTask } from "@/lib/actions/task.actions";
import TaskButton from "../shared/TaskButton";

interface ListCardProps {
  id: string;
  list: string;
  status: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
}

function ListCard({ id, list, author, status }: ListCardProps) {
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
            <p className="mt-2 text-small-regular text-light-2">{list}</p>
            <p className="mt-2 text-small-regular text-light-2">{status}</p>
          </div>
          <div>
            {status !== "Completed" && (
              <TaskButton
                data={{ id, status: "Completed" }}
                action={updateTask}
                label="Completed"
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ListCard;
