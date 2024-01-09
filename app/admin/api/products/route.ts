import prisma from "@/lib/prisma"
import { ProductInput } from "@/lib/types"
import { getUserFromSession } from "@/lib/utils-node"

export async function POST(request: Request) {
  const role = (await getUserFromSession({ role: true }))?.role
  if (role !== "Admin") return new Response("Unauthorized", { status: 401 })

  const data: ProductInput = await request.json()

  await prisma.product.create({ data })

  return new Response()
}
