import UserForm from "@/components/UserForm"
import { getUserFromSession } from "@/lib/utils-node"
import Link from "next/link"
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

  return (
    <>
      <Link href="/credit-cards">Edit Credit Card</Link>
      <UserForm user={user} />
    </>
  )
}
