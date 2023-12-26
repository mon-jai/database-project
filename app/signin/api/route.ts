import { getSession, isPasswordCorrect } from "@/lib/utils"
import { User } from "@prisma/client"

export async function POST(request: Request) {
  const body: User = await request.json()

  if (await isPasswordCorrect(body.username, body.password)) {
    const session = await getSession()

    session.username = body.username
    await session.save()

    return new Response("Success", { status: 200 })
  } else {
    return new Response("", { status: 401 })
  }
}
