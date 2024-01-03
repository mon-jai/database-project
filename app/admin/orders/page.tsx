import { ProductItem } from "@/components/ProductItem"
import prisma from "@/lib/prisma"
import { discountRateToString } from "@/lib/utils"

export default async function () {
  const orders = await prisma.order.findMany({
    include: { couponUsed: true, items: { include: { product: true } } },
    orderBy: { id: "asc" }
  })

  return (
    <>
      <h1 className="mb-3">Admin / Orders</h1>

      {orders.map(order => (
        <ol key={order.id} className="list-group mb-3">
          <li className="list-group-item p-4 d-flex justify-content-between align-items-start">
            <div>
              <h2>Order #{order.id}</h2>
              <div className="text-secondary">
                {order.orderedAt.toDateString()} ordered
                {order.shippedAt && ` • ${order.shippedAt.toDateString()} shipped`}
                {` • $${Math.round(
                  order.items.reduce(
                    (accumulator, { purchasePrice, quantity }) => accumulator + purchasePrice * quantity,
                    0
                  ) * (order.couponUsed?.discountRate ?? 1)
                )}`}{" "}
                {order.couponUsed && ` • ${discountRateToString(order.couponUsed.discountRate)}`}
              </div>
            </div>
            {order.shippedAt === null && (
              <div className="d-flex">
                <button className="btn btn-success">Mark as shipped</button>
              </div>
            )}
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
