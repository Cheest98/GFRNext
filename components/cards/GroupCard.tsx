"use client"

import { Session } from "next-auth";
import { useState } from "react";
import GroupModal from "../modals/GroupModal";
import { Button } from "../ui/button";


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
        <article className="flex gap-1 rounded-lg bg-dark-3 px-4 py-2 mt-2" >
            <div className="flex w-full flex-col justify-between">
                <div className='flex justify-between items-center'> {/* Add items-center here */}
                    <p className="text-small-regular text-light-2">
                      {groupName}
                    </p>
      
                <Button className="bg-primary-500" onClick={handleOpenClick}> Join </Button>
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
