import prisma from "@/lib/prisma"
import { getSession } from "@/lib/utils"

export async function GET() {
  const username = (await getSession()).username
  const user = await prisma.user.findFirst({
    where: { username },
    select: { username: true, password: true, email: true, phoneNumber: true }
  })

  return Response.json(user)
}