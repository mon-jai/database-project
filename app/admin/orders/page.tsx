import OrderItem from "./OrderItem"
import prisma from "@/lib/prisma"

export default async function () {
  const orders = await prisma.order.findMany({
    include: { couponUsed: true, items: { include: { product: true } } },
    orderBy: { id: "asc" }
  })

  return (
    <>
      <h1 className="mb-3">Admin / Orders</h1>

      {orders.map(order => (
        <OrderItem {...{ order }} />
      ))}
    </>
  )
}
