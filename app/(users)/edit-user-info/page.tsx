import UserForm from "@/components/UserForm"
import { getUserFromSession } from "@/lib/utils-node"
import { redirect } from "next/navigation"

export default async function EditUserInfo() {
  const user = await getUserFromSession({
    id: true,
    username: true,
    password: true,
    email: true,
    phoneNumber: true,
    avatar: true
  })
  if (user === null) return redirect("/signin")

  return <UserForm user={user} />
}
