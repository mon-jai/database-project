import { getUserFromSession } from "@/lib/utils"
import { Role } from "@prisma/client"
import { redirect } from "next/navigation"
import { PropsWithChildren } from "react"

export default async function ({ children }: PropsWithChildren) {
  const role = (await getUserFromSession({ role: true }))?.role

  if (role !== Role.Admin) return redirect("/")
  else return <>{children}</>
}
