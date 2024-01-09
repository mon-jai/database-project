import CreditCardForm from "./CreditCardForm"
import DeleteCreditCardButton from "./DeleteCreditCardButton"
import prisma from "@/lib/prisma"
import { getUserFromSession } from "@/lib/utils-node"
import { redirect } from "next/navigation"

export default async function ShoppingCart() {
  const user = await getUserFromSession({
    id: true,
    customer: { select: { userId: true } }
  })
  if (user?.id === undefined) return redirect("/signin")
  if (user.customer === null || user.customer === null) return redirect("/edit-user-info")

  const creditCards = await prisma.creditCard.findMany({ where: { customerUserId: user.id } })

  return (
    <>
      <h1 className="mb-3">Credit Card</h1>

      <ol className="list-group">
        {creditCards.map(creditCard => (
          <div key={creditCard.id} className="list-group-item d-flex align-items-center">
            <div className="me-auto">
              <div className="fw-bold text-body text-decoration-none">{creditCard.cardNo}</div>
              <div className="text-secondary">
                {creditCard.expirationMonth}/{creditCard.expirationYear}
              </div>
            </div>

            <div className="d-flex align-items-center gap-4">
              <DeleteCreditCardButton id={creditCard.id} />
            </div>
          </div>
        ))}
      </ol>

      <CreditCardForm />
    </>
  )
}
