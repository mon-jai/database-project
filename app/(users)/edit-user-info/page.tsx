import UserForm from "@/components/UserForm"
import { getUserFromSession } from "@/lib/utils"
import { redirect } from "next/navigation"

export default async function EditUserInfo() {
  const user = await getUserFromSession()
  if (user === null) return redirect("/signin")

  return <UserForm user={user} />
}
