"use client";
import { fetchGroupActivities } from "@/lib/actions/group.actions";
import { formatDateString } from "@/lib/utils";
import profilePicPlaceholder from "@/public/assets/profile-pic-placeholder.png";
import { Session } from "next-auth";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ActivityProps {
  session: Session | null;
}

interface Activity {
  user: {
    id: string;
    name: string | null;
    userImage: string | null;
    phone: string | null;
    groupId: string | null;
  };
  createdAt: Date;
  type: string;
  id: string;
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

const ActivityTab = ({ session }: ActivityProps) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [skip, setSkip] = useState(0);
  const [allActivitiesLoaded, setAllActivitiesLoaded] = useState(false);
  const fetchFlag = useRef({ shouldFetch: true });
  const loader = useRef(null);

  const fetchActivities = async () => {
    if (!session?.user?.groupId || isFetching || !fetchFlag.current.shouldFetch) return;

    setIsFetching(true);
    const currentSkip = skip; 

    try {
      const { activities: newActivities, totalCount } = await fetchGroupActivities({
        groupIdPrisma: session.user.groupId,
        skip: currentSkip,
        take: 15,
      });

      if (fetchFlag.current.shouldFetch && newActivities.length > 0) {
        setActivities(prev => [...prev, ...newActivities]);
        setSkip(currentSkip + newActivities.length);
        if (currentSkip + newActivities.length >= totalCount) {
          setAllActivitiesLoaded(true);
          fetchFlag.current.shouldFetch = false; 
        }
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setIsFetching(false);
    }
  };


  useEffect(() => {
    fetchFlag.current.shouldFetch = true;
    setAllActivitiesLoaded(false);
    setSkip(0);
    setActivities([]);
    fetchActivities();
  }, [session?.user?.groupId]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isFetching && fetchFlag.current.shouldFetch) {
        fetchActivities();
      }
    }, { threshold: 1.0 });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [loader, isFetching]); 

  return (
    <>
      <div className="mt-10 flex flex-col gap-5">
        {activities.map((activity) => (
          <article key={activity.id} className="activity-card">
            <Image
              src={activity.user.userImage || profilePicPlaceholder}
              alt="user_logo"
              width={20}
              height={20}
              className="rounded-full object-cover"
            />
            <p className="!text-small-regular text-light-1">
              <span className="mr-1 text-primary-500">
                {activity.user.name}
              </span>{" "}
              {getActivityDescription(activity.type)}{" "}
              {formatDateString(activity.createdAt.toISOString())}
            </p>
          </article>
        ))}
      </div>
      <div ref={loader}>
          {isFetching && <p className="!text-small-regular text-light-1"> Loading more...</p>}
          {!isFetching && allActivitiesLoaded && <p className="!text-small-regular text-light-1"> No more activities</p>}
        </div>
    </>
  );
};
export default ActivityTab;
