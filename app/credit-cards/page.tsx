import ProductItem from "../../components/ProductItem";
import CheckoutForm from "./CreditCardForm";
import EditQuantity from "./EditQuantity";
import RemoveItem from "./DeleteCreditCardButton";
import prisma from "@/lib/prisma";
import { getUserFromSession } from "@/lib/utils";
import { redirect } from "next/navigation";
import DeleteCreditCardButton from "./DeleteCreditCardButton";


export default async function ShoppingCart() {
  const user = await getUserFromSession({
    id: true,
    customer: { select: { userId: true } }
  })
  if (user?.id === undefined) return redirect("/signin")
  if (user.customer === null || user.customer === null) return redirect("/edit-info")

  const creditCards = await prisma.creditCard.findMany({ where: { customerUserId: user.id } })

  return (
    <>
      <h1 className="mb-3">Shopping Cart</h1>

      <ol className="list-group">
        {creditCards.map(creditCard => (
                    <div key={creditCard.id} className="list-group-item d-flex align-items-center">
            <div className="me-auto">
              <div className="fw-bold text-body text-decoration-none">{creditCard.cardNo}</div>
              <div className="text-secondary">${creditCard.expirationMonth} / {creditCard.expirationYear}</div>
            </div>

              <div className="d-flex align-items-center gap-4">
                <DeleteCreditCardButton id={creditCard.id} />
              </div>
          </div>
        ))}
      </ol>

      <CheckoutForm {...{ address, creditCards, coupons }} />
    </>
  )
}