import { IRON_SESSION_PASSWORD } from "@/lib/constants"
import { isPasswordCorrect } from "@/lib/utils"
import { User } from "@prisma/client"
import { getIronSession } from "iron-session"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body: User = await request.json()

  if (await isPasswordCorrect(body.username, body.password)) {
    const response = new Response("Success", { status: 200 })
    const session = await getIronSession(request, response, {
      cookieName: "user-session",
      password: IRON_SESSION_PASSWORD,
      cookieOptions: { secure: !(process.env.NODE_ENV === "development") }
    })
    await session.save()

    return response
  } else {
    return NextResponse.json("", { status: 400 })
  }
}
