import prisma from "@/lib/prisma"
import { ProductInput } from "@/lib/types"
import { getUserFromSession } from "@/lib/utils"

export async function POST(request: Request, { params: { id: productIdString } }: { params: { id: string } }) {
  const role = (await getUserFromSession({ role: true }))?.role
  if (role !== "Admin") return new Response("Unauthorized", { status: 401 })

  const productId = parseInt(productIdString)
  const data: ProductInput = await request.json()

  await prisma.product.update({ data, where: { id: productId } })

  return new Response()
}

export async function DELETE(request: Request, { params: { id: productIdString } }: { params: { id: string } }) {
  const role = (await getUserFromSession({ role: true }))?.role
  if (role !== "Admin") return new Response("Unauthorized", { status: 401 })

  const productId = parseInt(productIdString)
  await prisma.product.delete({ where: { id: productId } })

  return new Response()
}
