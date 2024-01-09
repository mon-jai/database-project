import prisma from "@/lib/prisma"
import { CouponInput, ProductInput } from "@/lib/types"
import { getUserFromSession } from "@/lib/utils-node"

type CouponError = Partial<Record<keyof CouponInput, string>>

export async function POST(request: Request) {
  const role = (await getUserFromSession({ role: true }))?.role
  if (role !== "Admin") return new Response("Unauthorized", { status: 401 })

  const { username, discountRate }: CouponInput = await request.json()

  const customerUserId = (await prisma.user.findFirst({ where: { username }, select: { id: true } }))?.id
  if (customerUserId === undefined) {
    return Response.json({ username: "User not exists" } satisfies CouponError, { status: 400 })
  }

  await prisma.coupon.create({ data: { customerUserId, discountRate } })
  return new Response()
}
