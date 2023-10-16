import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import UserMenuButton from "./UserMenuButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="navbar">
      <Link href="/" className="flex items-center gap-4">
        <p className="text-heading3-bold text-light-1 max-xs:hidden">GFR</p>
      </Link>
      <div className="/div>">
        <UserMenuButton session={session} />
      </div>
    </nav>
  );
}
