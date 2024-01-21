"use client";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import profilePicPlaceholder from "../../public/assets/profile-pic-placeholder.png";
import CreateGroupModal from "../modals/CreateGroupModal";

interface GroupHeaderProps {
  session: Session | null;
}

const GroupHeader = ({ session }: GroupHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGroupClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <article className="flex w-full flex-col rounded-xl  bg-dark-2 p-7">
        <div className="flex w-full flex-col justify-start">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-20 w-20 object-cover">
                <Image
                  src={profilePicPlaceholder}
                  alt="logo"
                  fill
                  className="rounded-full object-cover shadow-2xl"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-left text-heading3-bold text-light-1">
                  Group Name
                </h2>
              </div>
            </div>
            <Link href="/profile/edit">
              <div className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
                <Image
                  src="/assets/edit.svg"
                  alt="logout"
                  width={16}
                  height={16}
                />
                <p className="text-light-2 max-sm:hidden">Edit</p>
              </div>
            </Link>
          </div>
          <p className="mt-6 max-w-lg text-base-regular text-light-2">
            Group Bio
          </p>
          <div className="mt-12 h-0.5 w-full bg-dark-3" />
          <div className="flex justify-end mt-2">
            <button onClick={handleGroupClick}>
              <div className=" flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
                <Image
                  src="/assets/create.svg"
                  alt="create"
                  width={16}
                  height={16}
                />
                <p className="text-light-2 max-sm:hidden">Create</p>
              </div>
            </button>
          </div>
        </div>
      </article>
      {isModalOpen && (
        <CreateGroupModal session={session} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default GroupHeader;
