import prisma from "@/lib/prisma"
import { getUserFromSession } from "@/lib/utils"

export async function DELETE(_request: Request, { params: { id: creditCardIdString } }: { params: { id: string } }) {
  const creditCardId = parseInt(creditCardIdString)

  const customerUserId = (await getUserFromSession({ id: true }))?.id
  if (customerUserId === undefined) return new Response("Unauthorized", { status: 401 })

  await prisma.creditCard.delete({ where: { id: creditCardId } })
  return new Response()
}
