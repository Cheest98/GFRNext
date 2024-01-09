import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Calendar from "@/components/shared/Calendar";

import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  
  return (
    <div>
      <Calendar session={session} />
    </div>
  );
}
