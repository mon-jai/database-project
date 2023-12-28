import { getRoleFromSession } from "./lib/utils"
import { Role } from "@prisma/client"
import { redirect } from "next/navigation"

export async function middleware() {
  const role = await getRoleFromSession()
  if (role !== Role.Admin) return redirect("/")
}

export const config = {
  matcher: "/admin/*"
}
