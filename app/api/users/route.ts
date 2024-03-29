import prisma from "@/lib/prisma"
import { hashPassword } from "@/lib/utils-node"
import { Prisma } from "@prisma/client"

export async function POST(request: Request) {
  const body: Prisma.UserCreateInput = await request.json()
  body.password = await hashPassword(body.password)
  body.role = "Customer"
  body.customer = { create: {} }

  return Response.json(await prisma.user.create({ data: body }))
}
