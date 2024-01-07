import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import profilePicPlaceholder from "../../public/assets/profile-pic-placeholder.png";

interface ActivityCardProps {
  id: string;
  userName: string | null;
  userImage: string | null;
  description: string;
  createdAt: string;
}

function ActivityCard({
  id,
  userName,
  userImage,
  createdAt,
  description,
}: ActivityCardProps) {
  const authorImage = userImage ? userImage : profilePicPlaceholder;
  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-11 w-11">
              <Image
                src={authorImage}
                alt="user_community_image"
                layout="fill"
                className="cursor-pointer rounded-full"
              />
            </div>
            <p className="text-small-regular text-light-2">
              {`${userName} ${description} ${formatDateString(createdAt)}`}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ActivityCard;
