import prisma from "@/lib/prisma"
import { getUserFromSession } from "@/lib/utils"

export async function POST(_request: Request, { params: { id: orderIdString } }: { params: { id: string } }) {
  const role = (await getUserFromSession({ role: true }))?.role
  if (role !== "Admin") return new Response("Unauthorized", { status: 401 })

  const orderId = parseInt(orderIdString)
  const shippedAt = new Date()

  await prisma.order.update({ data: { shippedAt }, where: { id: orderId } })

  return Response.json({ shippedAt: shippedAt.getTime().toString() })
}
