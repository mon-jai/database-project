import prisma from "@/lib/prisma"
import { CreditCardInput } from "@/lib/types"
import { getUserFromSession } from "@/lib/utils"

export async function POST(request: Request) {
  const data: CreditCardInput = await request.json()

  const customerUserId = (await getUserFromSession({ id: true }))?.id
  if (customerUserId === undefined) return new Response("Unauthorized", { status: 401 })

  await prisma.creditCard.create({ data: { ...data, customerUserId } })

  return new Response()
}
