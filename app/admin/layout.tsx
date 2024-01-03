import { getUserFromSession } from "@/lib/utils"
import { Role } from "@prisma/client"
import { redirect } from "next/navigation"

export default async function () {
  const role = (await getUserFromSession({ role: true }))?.role
  if (role !== Role.Admin) return redirect("/")
}
