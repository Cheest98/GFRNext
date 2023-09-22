import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreateGroup from "@/components/forms/CreateGroup";

async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text"> Create group</h1>
      <section className="mt-9 bg-dark-2 p-10">
        <CreateGroup session={session} />
      </section>
    </main>
  );
}

export default Page;
