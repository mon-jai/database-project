import { ProductItem } from "@/components/ProductItem"
import prisma from "@/lib/prisma"
import { getUserFromSession } from "@/lib/utils"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function () {
  const customerUserId = (await getUserFromSession({ id: true }))?.id
  if (customerUserId === undefined) return redirect("signin")

  const orders = await prisma.order.findMany({
    where: { customerUserId },
    include: { couponUsed: true, items: { include: { product: true } } }
  })

  return (
    <>
      <h1 className="mb-3">Orders</h1>

      {orders.map(order => (
        <ol className="list-group mb-3">
          <li className="list-group-item p-4">
            <h2>Order {order.id}</h2>
            <div className="text-secondary">
              Ordered at: {order.orderedAt.toDateString()}
              {order.shippedAt && ` • Shipped at: ${order.shippedAt.toString()}`}
              {order.couponUsed && ` • Discount: ${order.couponUsed.discountRate * 100}%`}
            </div>
          </li>
          {order.items.map(({ product }) => (
            <ProductItem {...{ product }} />
          ))}
        </ol>
      ))}
    </>
  )
}
