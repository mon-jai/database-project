import { authenticate, getSession } from "@/lib/utils"
import { User } from "@prisma/client"

export async function POST(request: Request) {
  const body: User = await request.json()

  try {
    await authenticate(body.username, body.password)

    const session = await getSession()
    session.username = body.username
    await session.save()

    return new Response("Success", { status: 200 })
  } catch (_error) {
    const error: AUTHENTICATION_ERRORS = _error as AUTHENTICATION_ERRORS

    if (error === AUTHENTICATION_ERRORS.USER_NOT_FOUND) {
      return Response.json({ username: "user not found" }, { status: 401 })
    } else if (error === AUTHENTICATION_ERRORS.INCORRECT_PASSWORD) {
      return Response.json({ password: "Incorrect password" }, { status: 401 })
    }
  }
}
