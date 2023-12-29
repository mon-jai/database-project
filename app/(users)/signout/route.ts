import { getSession } from "@/lib/utils"
import { redirect } from "next/navigation"

export  async function GET() {
  const session = await getSession()
  session.destroy()

  return redirect("/")
}
