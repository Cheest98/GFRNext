"use client";
import {
  fetchRecentActivities,
  fetchUpcomingEvents,
} from "@/lib/actions/group.actions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ActivityCard from "../cards/ActivityCard";
import RightSidebarSkeleton from "../Skeletons/RightSideBarSkeleton";
import { formatDateString } from "@/lib/utils";
import Image from "next/image";

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

interface Event {
  id: string;
  title: string;
  description: string;
  start: Date;
}

const getActivityDescription = (type: string) => {
  switch (type) {
    case "POST_CREATED":
      return " has created the post on ";
    case "TASK_CREATED":
      return "has created the task on ";
    case "TASK_UPDATED":
      return " has updated the task on";
    case "LIST_UPDATED":
      return " has updated the list on";
    case "LIST_CREATED":
      return "has created the list on ";
    case "GROUP_LEFT":
      return " has left the group on";
    case "EVENT_CREATED":
      return " has created the event on  ";
    case "EVENT_UPDATED":
      return " has updated the event on";
    default:
      return "did something on";
  }
};

const RightSidebar = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { data: session } = useSession();
  const groupId = session?.user.groupId;

  useEffect(() => {
    let intervalId: number | undefined;
    const fetchActivities = async () => {
      if (groupId !== undefined) {
        const activitiesData = await fetchRecentActivities({ groupId });
        const eventsData = await fetchUpcomingEvents({ groupId });
        setActivities(activitiesData);
        setUpcomingEvents(eventsData);
        setLoading(false);
      } else {
        console.log("Failed to fetch activites on frontend");
      }
    };

    if (session) {
      fetchActivities();
    }

    if (session) {
      fetchActivities();
      intervalId = setInterval(fetchActivities, 60000) as unknown as number;
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [session]);

  if (loading) {
    return <RightSidebarSkeleton />;
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
        <h3 className="text-heading4-medium text-light-1">Upcoming events</h3>
        {upcomingEvents.map((event) => (
          <div key={event.id} className="mt-2">
            <div className="flex items-center gap-2 p-3 ">
              <Image
                src="/assets/calendar.svg"
                alt="Calendar"
                width={14}
                height={14}
              />
              <p className="font-bold text-light-2">{event.title}</p>
              <p className="text-small-regular text-light-2 ml-2">
                {" "}
                will start on {formatDateString(event.start.toISOString())}
              </p>
            </div>
          </div>
        ))}
        <div className="mt-7 flex w-[350px] flex-col gap-10"></div>
      </div>
    </section>
  );
};
export default RightSidebar;
