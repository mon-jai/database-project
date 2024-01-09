import { ProductItem } from "@/components/ProductItem"
import prisma from "@/lib/prisma"
import { getUserFromSession } from "@/lib/utils"
import { discountRateToString } from "@/lib/utils-shared"
import { redirect } from "next/navigation"

export default async function Orders() {
  const customerUserId = (await getUserFromSession({ id: true }))?.id
  if (customerUserId === undefined) return redirect("/signin")

  const orders = await prisma.order.findMany({
    where: { customerUserId },
    include: { couponUsed: true, items: { include: { product: true } } },
    orderBy: { id: "asc" }
  })

  return (
    <>
      <h1 className="mb-3">Admin / Orders</h1>

      {orders.map(order => (
        <ol key={order.id} className="list-group mb-3">
          <li className="list-group-item p-4 d-flex justify-content-between align-items-end">
            <div>
              <h2>Order #{order.id}</h2>
              <div className="text-secondary">
                {order.orderedAt.toDateString()} ordered
                {order.shippedAt && ` • ${order.shippedAt.toDateString()} shipped`}
                {order.couponUsed && ` • ${discountRateToString(order.couponUsed.discountRate)}`}
              </div>
            </div>
            <div className="d-flex flex-column">
              <button className="btn btn-success">Mark as shipped</button>

              <span className="text-success fs-3">
                $
                {Math.round(
                  order.items.reduce(
                    (accumulator, { purchasePrice, quantity }) => accumulator + purchasePrice * quantity,
                    0
                  ) * (order.couponUsed?.discountRate ?? 1)
                )}
              </span>
            </div>
          </li>
          {order.items.map(({ product, quantity }) => (
            <ProductItem key={product.id} product={product} image={false}>
              <span className="text-secondary fs-5">{quantity}</span>
            </ProductItem>
          ))}
        </ol>
      ))}
    </>
  )
}
