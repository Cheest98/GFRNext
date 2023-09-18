import Image from "next/image";
import Link from "next/link";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="navbar">
      <Link href="/" className="flex items-center gap-4">
        <p className="text-heading3-bold text-light-1 max-xs:hidden">GFR</p>
      </Link>

      <UserMenuButton session={session} />
    </nav>
  );
}
