import prisma from "@/lib/prisma"
import { getUserFromSession } from "@/lib/utils-node"

export async function POST(request: Request) {
  const { productId, quantity }: { productId: number; quantity: number } = await request.json()

  const customerUserId = (await getUserFromSession({ id: true }))?.id
  if (customerUserId === undefined) return new Response("Unauthorized", { status: 401 })

  await prisma.shoppingCart.upsert({
    where: { customerUserId_productId: { customerUserId, productId } },
    update: { quantity },
    create: { customerUserId, productId, quantity }
  })
  return new Response()
}
