"use client";
import { getUserImage } from "@/lib/actions/user.actions";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import profilePicPlaceholder from "../../public/assets/profile-pic-placeholder.png";

interface ProfileHeaderProps {
  name: string;
  bio: string;
  phone: string;
  groupName: string;
  email: string;
}

const ProfileHeader = ({
  groupName,
  name,
  email,
  bio,
  phone,
}: ProfileHeaderProps) => {
  const [imageUrl, setImageUrl] = useState<string | StaticImageData>(
    profilePicPlaceholder
  );
  useEffect(() => {
    const fetchImageUrl = async () => {
      if (email) {
        try {
          const response = await getUserImage({ email });
          if (response.userImage) {
            setImageUrl(response.userImage);
          }
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    };

    fetchImageUrl();
  }, []);

  return (
    <article className="flex w-full flex-col rounded-xl  bg-dark-2 p-7">
      <div className="flex w-full flex-col justify-start">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-20 w-20 object-cover">
              <Image
                src={imageUrl}
                alt="logo"
                fill
                className="rounded-full object-cover shadow-2xl"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-left text-heading3-bold text-light-1">
                {name}
              </h2>
              <p className="text-base-medium text-gray-1">{groupName}</p>
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

        <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>

        <div className="mt-12 h-0.5 w-full bg-dark-3" />
      </div>
    </article>
  );
};

export default ProfileHeader;
