import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import profilePicPlaceholder from "../../public/assets/profile-pic-placeholder.png";

import { memberItems, profileTabs } from "@/app/constants";
import MemberInfo from "../shared/memberInfo";

interface UserCardProps {
  id: string;
  userName: string | null;
  userImage: string | null;
  events: number;
  posts: number;
  tasks: number;
  lists: number;
}

interface UserStats {
  posts: number;
  tasks: number;
  events: number;
  lists: number;
}

function UserCard({
  id,
  userName,
  userImage,
  events,
  posts,
  tasks,
  lists,
}: UserCardProps) {
  const userSrcImage = userImage ? userImage : profilePicPlaceholder;
  const userStats: UserStats = { posts, tasks, events, lists };

  
  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-3 mt-2">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <div className="relative h-11 w-11">
            <Image
              src={userSrcImage}
              alt="user_community_image"
              layout="fill"
              className="rounded-full"
            />
          </div>
          <p className="font-bold text-light-2">{userName}</p>
        </div>
        {/* This div now uses 'flex-grow' to take up available space */}
        <div className="flex flex-grow items-center justify-between p-4">
        {memberItems.map((item) => (
            <MemberInfo key={item.alt} src={item.src} alt={item.alt} label={`${item.alt}: ${userStats[item.key as keyof UserStats]}`} />
          ))}
        </div>
      </div>
    </article>
  );
}

export default UserCard;
