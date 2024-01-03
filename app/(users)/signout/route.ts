import { getSession } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function GET() {
  const session = await getSession()
  session.destroy()

  revalidatePath("/", "layout")
  return redirect("/")
}
