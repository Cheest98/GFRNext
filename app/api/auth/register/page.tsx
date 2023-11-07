import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AccountProfile from "@/components/forms/AccountProfile";
import { getServerSession } from "next-auth";

async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text"> Edit</h1>
      <p className="mt-3 text-base-regular text-light-2"> LogIn</p>
      <section className="mt-9 bg-dark-2 p-10">
      </section>
    </main>
  );
}

export default Page;
