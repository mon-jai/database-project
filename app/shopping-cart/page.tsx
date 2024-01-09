import ProductItem from "../../components/ProductItem"
import CheckoutForm from "./CheckoutForm"
import EditQuantity from "./EditQuantity"
import RemoveItem from "./RemoveItem"
import prisma from "@/lib/prisma"
import { getUserFromSession } from "@/lib/utils-node"
import { redirect } from "next/navigation"

export default async function ShoppingCart() {
  const user = await getUserFromSession({
    id: true,
    customer: {
      select: {
        address: true,
        creditCards: true,
        coupons: {
          include: {
            _count: {
              select: { order: true }
            }
          }
        }
      }
    }
  })
  if (user?.id === undefined) return redirect("/signin")
  if (user.customer === null || user.customer.address === null) return redirect("/edit-user-info")

  const items = await prisma.shoppingCart.findMany({ where: { customerUserId: user.id }, include: { product: true } })

  const { address, creditCards, coupons } = user.customer

  return (
    <>
      <h1 className="mb-3">Shopping Cart</h1>

      <ol className="list-group">
        {items.map(item => (
          <ProductItem key={item.product.id} product={item.product}>
            <EditQuantity productId={item.product.id} quantity={item.quantity} />
            <RemoveItem productId={item.product.id} />
          </ProductItem>
        ))}
      </ol>

      <CheckoutForm {...{ address, creditCards, coupons }} />
    </>
  )
}
