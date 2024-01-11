import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Calendar from "@/components/shared/Calendar";
import { fetchGroupEvents } from "@/lib/actions/event.actions";

import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const groupIdPrisma = session?.user?.groupId || undefined;

  const events = await fetchGroupEvents({ groupIdPrisma });
  
  return (
    <div>
      <Calendar session={session} events={events} />
    </div>
  );
}
