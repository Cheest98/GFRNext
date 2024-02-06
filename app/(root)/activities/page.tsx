import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ActivityTab from "@/components/shared/ActivityTab";
import { getServerSession } from "next-auth";

async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <h1 className="head-text">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        <ActivityTab session={session} />
      </section>
    </>
  );
}

export default Page;
