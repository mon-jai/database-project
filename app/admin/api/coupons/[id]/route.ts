import prisma from "@/lib/prisma"
import { ProductInput } from "@/lib/types"
import { getUserFromSession } from "@/lib/utils-node"

export async function DELETE(_request: Request, { params: { id: couponIdString } }: { params: { id: string } }) {
  const role = (await getUserFromSession({ role: true }))?.role
  if (role !== "Admin") return new Response("Unauthorized", { status: 401 })

  const couponId = parseInt(couponIdString)
  await prisma.coupon.delete({ where: { id: couponId } })

  return new Response()
}
