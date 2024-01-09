import prisma from "@/lib/prisma"
import { getUserFromSession } from "@/lib/utils"

export async function POST(request: Request) {
  const { creditCardId, couponId } = await request.json()


  return new Response()
}
