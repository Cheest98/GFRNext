"use client";
import { fetchRecentActivities } from "@/lib/actions/group.actions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ActivityCard from "../cards/ActivityCard";
import RightSidebarSkeleton from "../Skeletons/RightSideBarSkeleton";

interface Activity {
  id: string;
  type: string;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    userImage: string | null;
  };
}

const getActivityDescription = (type: string) => {
  switch (type) {
    case "POST_CREATED":
      return "added a new post on";
    case "TASK_CREATED":
      return "added a new task on";
    case "TASK_UPDATED":
      return "updated a task on";
    case "LIST_UPDATED":
      return "updated a task on";
    case "GROUP_LEFT":
      return "left group on";
    default:
      return "did something on";
  }
};

const RightSidebar = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { data: session } = useSession();
  const groupId = session?.user.groupId;
  useEffect(() => {
    const fetchActivities = async () => {
      if (groupId !== undefined) {
        const data: Activity[] = await fetchRecentActivities({ groupId });
        setActivities(data);
      } else {
        console.log("Failed to fetch activites on frontend");
      }
    };

    if (session) {
      fetchActivities();
    }
    setLoading(false)
  }, [session]);


  if (loading) {
    return <RightSidebarSkeleton />; // Render the skeleton loader when loading
  }

  return (
    <section className="custom-scrollbar rightsidebar ">
      <div className="flex flex-1 flex-col justify-start  bg-dark-2 rounded-lg p-4">
        <h3 className="text-heading4-medium text-light-1">Activity</h3>
        <div>
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              id={activity.id}
              userName={(activity.user.name || "Unknown").substring(0, 10)}
              userImage={activity.user.userImage}
              createdAt={activity.createdAt.toISOString()}
              description={getActivityDescription(activity.type)}
            />
          ))}
        </div>
        <div className="mt-7 flex w-[350px] flex-col gap-9"></div>

      </div>
      <div className="flex flex-1 flex-col justify-start  bg-dark-2 rounded-lg p-4 mt-5">
        <h3 className="text-heading4-medium text-light-1">
          Tutaj ludzie z grupy?
        </h3>
        <div className="mt-7 flex w-[350px] flex-col gap-10"></div>

      </div>
    </section>
  
  );
};
export default RightSidebar;
