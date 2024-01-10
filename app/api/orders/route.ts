import prisma from "@/lib/prisma"
import { getUserFromSession } from "@/lib/utils-node"

export async function POST(request: Request) {
  const { creditCardId, couponId } = await request.json()

  const userId = (await getUserFromSession({ id: true }))?.id
  if (userId === undefined) return new Response("Unauthorized", { status: 401 })

  const items = await prisma?.shoppingCart.findMany({
    where: { customerUserId: userId },
    select: { quantity: true, product: { select: { id: true, price: true, stock: true } } }
  })
  if (items.length === 0) return new Response("No items added to cart", { status: 400 })

  const orderId = (
    await prisma.order.create({
      data: {
        customer: { connect: { userId } },
        creditCard: { connect: { id: creditCardId } },
        couponUsed: couponId !== undefined ? { connect: { id: couponId } } : {}
      }
    })
  ).id

  for (const item of items) {
    await prisma.orderItem.create({
      data: { orderId, productId: item.product.id, purchasePrice: item.product.price, quantity: item.quantity }
    })
    await prisma.product.update({ data: { stock: { decrement: 1 } }, where: { id: item.product.id } })
  }

  await prisma.shoppingCart.deleteMany({ where: { customerUserId: userId } })

  return new Response()
}
