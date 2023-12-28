import prisma from "@/lib/prisma"
import { getUserFromSession } from "@/lib/utils"
import { redirect } from "next/navigation"

export default async function () {
  const customerUserId = (await getUserFromSession({ select: { id: true } }))?.id
  if (customerUserId === undefined) return redirect("signin")

  const orders = await prisma.order.findMany({
    where: { customerUserId },
    include: { couponUsed: true, items: { include: { product: true } } }
  })

  return (
    <>
      <div>Orders</div>

      {orders.map(order => (
        <div>
          <div>{order.orderedAt.toString()}</div>
          <div>{order.shippedAt.toString()}</div>
          {order.couponUsed && <div>{order.couponUsed.discountRate}</div>}

          {order.items.map(orderItem => (
            <div>
              <img src={orderItem.product.images[0]} />
              <div>{orderItem.product.name}</div>
              <div>{orderItem.purchasePrice}</div>
              <div>{orderItem.quantity}</div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
