"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { fetchRecentActivities } from '@/lib/actions/group.actions';

interface Activity {
  id: string;
  type: string; // Activity type, e.g., "POST_CREATED", "TASK_UPDATED"
  createdAt: Date; // Include date if you want to display it
  user: {
    id: string;
    name: string| null; // and any other user details you need
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
        return "left group on" ;
    default:
      return "did something on";
  }
};



const RightSidebar = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const { data: session } = useSession();
  const groupId = session?.user.groupId;
  useEffect(() => {
    // Fetch recent activities for the user's group
    const fetchActivities = async () => {
      if (groupId !== undefined) {
        const data: Activity[] = await fetchRecentActivities({ groupId });
        setActivities(data);
      } else {
        console.log("Failed to fetch activites on frontend")
      }
    };

    if (session) {
      fetchActivities();
    }
  }, [session]);

    return (
        <section className='custom-scrollbar rightsidebar'>
          <div className='flex flex-1 flex-col justify-start  bg-dark-2 rounded-lg p-4'>
            <h3 className='text-heading4-medium text-light-1'>
              Activity
            </h3>
            <div>
      {activities.map(activity => (
        <div key={activity.id}>
          <p className='text-heading4-medium text-light-1'>{activity.user.name}  {getActivityDescription(activity.type)} {activity.createdAt.toLocaleString()}</p>
        </div>
      ))}
    </div>
    
            <div className='mt-7 flex w-[350px] flex-col gap-9'>

            </div>
          </div>
    
          <div className='flex flex-1 flex-col justify-start  bg-dark-2 rounded-lg p-4' >
            <h3 className='text-heading4-medium text-light-1'>Tutaj ludzie z grupy?</h3>
            <div className='mt-7 flex w-[350px] flex-col gap-10'>
            </div>
          </div>
        </section>
      );
    }
export default RightSidebar;