import prisma from "@/lib/prisma";
import { getUserFromSession } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";


// TODO
// TODO: Redirect if no credit card
export default async function ({ params: { id } }: { params: { id: string } }) {
  const user = (await getUserFromSession({ select: {id: true}, include: { customer: { include: { creditCards: true , coupons: true} } } }))
    if (user === null) return redirect("/")

  const product = await prisma.shoppingCart.findMany({ where: { customerUserId: user.id  } })

  const creditCards = user.customer!.creditCards
  const coupons = user.customer!.coupons

  if (creditCards === undefined || creditCards.length === 0) {
    alert("You need to add a credit card before placing orders.")
    return redirect("/edit-user-info")
  }

  return (
    <div>

    </div>
  )
}