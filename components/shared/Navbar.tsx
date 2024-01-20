import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import Searchbar from "./Searchbar";
import UserMenuButton from "./UserMenuButton";
async function searchGroup(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions);



  return (
    <nav className="navbar">
      <div className="flex justify-between">
      <Link href="/" className="flex items-center gap-4">
        <p className="text-heading3-bold text-light-1 max-xs:hidden">GFR</p>
      </Link>

      <Searchbar action={searchGroup} />

      </div>

      <div className="/div>">
        <UserMenuButton session={session} />
      </div>
    </nav>
  );
}
