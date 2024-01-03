import { getUserFromSession } from "./lib/utils"
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";


export async function middleware() {
  const role = await(await getUserFromSession({ role: true }))?.role
  if (role !== Role.Admin) return redirect("/")
}

export const config = {
  matcher: "/admin/(.*)"
}