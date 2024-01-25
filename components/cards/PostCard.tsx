import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import profilePicPlaceholder from "../../public/assets/profile-pic-placeholder.png";

interface PostCardProps {
  id: string;
  content: string;
  picturePath: string | null;
  author: {
    name: string;
    userImage: string | null;
    id: string;
  };
  createdAt: string;
}

function PostCard({
  id,
  content,
  author,
  createdAt,
  picturePath,
}: PostCardProps) {
  const authorImage = author.userImage ? author.userImage : profilePicPlaceholder;
  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <div className="relative h-11 w-11">
              <Image
                src={authorImage}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full"
              />
            </div>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col justify-between">
            <div className="flex justify-between">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
              <div>
                <Image
                  src="/assets/heart-gray.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>
            </div>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            {picturePath && (
              <div className="mb-2 mt-2 flex flex-col gap-1">
                <div className="flex gap-3.5 max-size-image">
                  <Image
                    src={picturePath}
                    alt="post image"
                    layout="responsive"
                    width={500}
                    height={500}
                    className="cursor-pointer object-contain"
                  />
                </div>
              </div>
            )}
            <div className="mt-2 flex items-center">
              <p className="text-subtle-medium text-gray-1">
                {formatDateString(createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
