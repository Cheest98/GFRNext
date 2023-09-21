import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";

async function addPost(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
}
