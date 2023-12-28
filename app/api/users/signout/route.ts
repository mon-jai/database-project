import { getSession } from "@/lib/utils"

export async function POST() {
  const session = await getSession()
  session.destroy()

  return new Response("Success", { status: 200 })
}
