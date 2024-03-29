import prisma from "@/lib/prisma"
import { getUserFromSession } from "@/lib/utils-node"

export async function POST(request: Request, { params: { id: productIdString } }: { params: { id: string } }) {
  const productId = parseInt(productIdString)
  const { quantity }: { quantity: number } = await request.json()

  const customerUserId = (await getUserFromSession({ id: true }))?.id
  if (customerUserId === undefined) return new Response("Unauthorized", { status: 401 })

  await prisma.shoppingCart.update({
    data: { quantity },
    where: { customerUserId_productId: { customerUserId, productId } }
  })
  return new Response()
}

export async function DELETE(_request: Request, { params: { id: productIdString } }: { params: { id: string } }) {
  const productId = parseInt(productIdString)

  const customerUserId = (await getUserFromSession({ id: true }))?.id
  if (customerUserId === undefined) return new Response("Unauthorized", { status: 401 })

  await prisma.shoppingCart.delete({ where: { customerUserId_productId: { customerUserId, productId } } })
  return new Response()
}
