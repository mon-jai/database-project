import { cookies } from "next/headers"

export async function GET() {
  cookies().set({
    name: "user-session",
    value: "",
    path: "/"
  })

  return new Response("deleted")
}
