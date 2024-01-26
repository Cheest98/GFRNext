"use client";
import { getUserInfo } from "@/lib/actions/user.actions";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import profilePicPlaceholder from "../../public/assets/profile-pic-placeholder.png";
import { Session } from "next-auth";

interface ProfileHeaderProps {
  session: Session | null;
  groupName: string;
}

interface ProfileHeaderInfo {
name: string;
bio: string;
phone: string;
email:string;
userImage:string | StaticImageData;
}



const ProfileHeader = ({
  session,
  groupName
}: ProfileHeaderProps) => {
  const [userInfo, setUserInfo] = useState<ProfileHeaderInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUserInfo() {
      if (!session) {
        setError("Session not available.");
        setLoading(false);
        return;
      }

      try {
        const fetchedUserInfo = await getUserInfo({ session });
        setUserInfo(fetchedUserInfo);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError("Failed to load user information.");
        setLoading(false);
      }
    }

    fetchUserInfo();
  }, [session]);  // Adding session as a dependency

  if (loading) {
    return <div>Loading user information...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userInfo) {
    return <div>No user information available</div>;
  }

  const imageUrl = userInfo.userImage || profilePicPlaceholder;


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
                {userInfo.name}
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

        <p className="mt-6 max-w-lg text-base-regular text-light-2">{userInfo.bio}</p>

        <div className="mt-12 h-0.5 w-full bg-dark-3" />
      </div>
    </article>
  );
};

export default ProfileHeader;
