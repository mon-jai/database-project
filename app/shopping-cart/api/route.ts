import prisma from "@/lib/prisma";
import { getUserFromSession } from "@/lib/utils";


export async function DELETE(request: Request) {
  const { productId }: { productId: number } = await request.json()

  try {
    const customerUserId = (await getUserFromSession({select:{ id: true }}))?.id
    if (customerUserId === undefined) return new Response("Unauthorized", { status: 401 })

    await prisma.shoppingCart.delete({ where: { customerUserId_productId: { customerUserId, productId } } })
    return new Response("", { status: 200 })
  } catch (error: any) {
    return new Response(error.toString(), { status: 500 })
  }
}