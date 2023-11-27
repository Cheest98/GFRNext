"use client"

import { deleteTask, updateTask } from "@/lib/actions/task.actions";
import { formatDateString } from "@/lib/utils";
import { Session } from "next-auth";
import { useState } from "react";
import profilePicPlaceholder from "../../public/assets/profile-pic-placeholder.png";
import TaskModal from "../modals/TaskModal";
import DeleteButton from "../shared/DeleteButton";
import TaskButton from "../shared/TaskButton";
import JoinButton from "../shared/JoinButton";
import { joinGroup } from "@/lib/actions/group.actions";
import GroupModal from "../modals/GroupModal";


interface GroupCardProps {
  session: Session | null;
  joinGroupId: string;
  groupName:string;
  password: string;
}

function GroupCard({ joinGroupId, groupName, password,  session }: GroupCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
        <article className="flex gap-1 rounded-lg bg-dark-3 px-4 py-2 mt-2" onClick={(handleOpenClick)} >
            <div className="flex gap-1 rounded-lg bg-dark-3 px-4 py-2 mt-2">
                <div className="text-small-regular text-light-2">
                  {groupName}
                </div>
              </div>
  

    </article>
    {isModalOpen && (
        <GroupModal             
        joinGroupId={joinGroupId}
        password={password}
        session={session}
        onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default GroupCard;
