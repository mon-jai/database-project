import prisma from "@/lib/prisma"
import dynamic from "next/dynamic"

// https://stackoverflow.com/a/66374800/
const OrderItem = dynamic(() => import("./OrderItem"), { ssr: false })

export default async function Orders() {
  const orders = await prisma.order.findMany({
    include: { couponUsed: true, items: { include: { product: true } } },
    orderBy: { id: "asc" }
  })

  return (
    <>
      <h1 className="mb-3">Admin / Orders</h1>

      {orders.map(order => (
        <OrderItem key={order.id} {...{ order }} />
      ))}
    </>
  )
}
