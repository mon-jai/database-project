import prisma from "@/lib/prisma"
import { getUserFromSession, hashPassword } from "@/lib/utils"
import { Prisma } from "@prisma/client"

export async function POST(request: Request, { params: { id: userIdString } }: { params: { id: string } }) {
  const user = await getUserFromSession({ id: true, role: true })
  if (user === null || user.id !== parseInt(userIdString)) return new Response("Unauthorized", { status: 401 })

  const body: Partial<Prisma.UserUpdateInput> & { password?: string } = await request.json()
  body.role = user.role

  return Response.json(await prisma.user.update({ data: body, where: { id: user.id } }))
}
