import prisma from "@/lib/prisma"
import { getUserFromSession } from "@/lib/utils"

export async function POST(request: Request) {
  const { productId, quantity }: { productId: number; quantity: number } = await request.json()

  const customerUserId = (await getUserFromSession({ id: true }))?.id
  if (customerUserId === undefined) return new Response("Unauthorized", { status: 401 })

  await prisma.shoppingCart.create({ data: { customerUserId, productId, quantity } })
  return new Response()
}
