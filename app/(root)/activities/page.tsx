import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchGroupActivities } from "@/lib/actions/group.actions";
import { formatDateString } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Image from "next/image";

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

async function Page() {
  const session = await getServerSession(authOptions);
  const groupIdPrisma = session?.user?.groupId;

  let activity: any[] = [];

  if (groupIdPrisma) {
    activity = await fetchGroupActivities({ groupIdPrisma });
  }

  return (
    <>
      <h1 className="head-text">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <article className="activity-card">
                <Image
                  src={activity.user.image}
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
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </section>
    </>
  );
}

export default Page;
