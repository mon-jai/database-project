import { ProductItem } from "../../components/ProductItem"
import CheckoutForm from "./CheckoutForm"
import EditQuantity from "./EditQuantity"
import RemoveItem from "./RemoveItem"
import prisma from "@/lib/prisma"
import { getUserFromSession } from "@/lib/utils"
import { redirect } from "next/navigation"

export default async function () {
  const user = await getUserFromSession({
    id: true,
    customer: { select: { address: true, creditCards: true, coupons: true } }
  })
  if (user?.id === undefined) return redirect("/signin")
  if (user.customer === null || user.customer.address === null) return redirect("/edit-info")

  const products = (
    await prisma.shoppingCart.findMany({ where: { customerUserId: user.id }, include: { product: true } })
  ).map(({ product }) => product)

  const { address, creditCards, coupons } = user.customer

  return (
    <>
      <h1 className="mb-3">Shopping Cart</h1>

      <ol className="list-group">
        {products.map(product => (
          <ProductItem {...{ product }}>
            <EditQuantity productId={product.id} />
            <RemoveItem productId={product.id} />
          </ProductItem>
        ))}
      </ol>

      <CheckoutForm {...{ address, creditCards, coupons }} />
    </>
  )
}
