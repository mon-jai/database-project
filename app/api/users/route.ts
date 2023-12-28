import prisma from "@/lib/prisma"
import { hashPassword } from "@/lib/utils"
import { User } from "@prisma/client"

export async function POST(request: Request) {
  const body: User = await request.json()
  body.password = await hashPassword(body.password)
  body.role = "Customer"

  return Response.json(await prisma.user.create({ data: body }))
}
