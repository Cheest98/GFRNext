import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { profileTabs } from "@/app/constants";
import PostTab from "@/components/shared/PostTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import TaskTab from "@/components/shared/TaskTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGroupInfo } from "@/lib/actions/group.actions";
import { getServerSession } from "next-auth";
import Image from "next/image";



async function Page() {
  const session = await getServerSession(authOptions);
  const groupIdPrisma = session?.user?.groupId || undefined;
  let groupInfo;
  if (session?.user?.groupId) {
    groupInfo = await getGroupInfo({ groupIdPrisma: session.user.groupId });
} else {
    // Handle the case when there is no group ID
    // For example, set groupInfo to null or some default value
    groupInfo = null;
}


  return (
    <section>
      <ProfileHeader 
        name={session?.user.name || " Unknow"}
        bio={session?.user.bio || "Not updated yet"}
        phone={session?.user.phone || "999 999 999"}
        groupName={groupInfo?.name || " Something went wrong"}
        email={session?.user.email|| "public/assets/profile-pic-holder.png"}
      />
       <div className='mt-9'>
        <Tabs defaultValue='posts' className='w-full'>
          <TabsList className='tab'>
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p className='max-sm:hidden'>{tab.label}</p>


              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className='w-full text-light-1'
            >
              {/* @ts-ignore */}
              {tab.value === 'posts' && (
                <PostTab session={session} />
              )}
              {tab.value === 'tasks' && (
                <TaskTab session={session} />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
export default Page;