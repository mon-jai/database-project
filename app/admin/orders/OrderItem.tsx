"use client"

import ProductItem from "@/components/ProductItem"
import { ShipOrderResponse } from "@/lib/types"
import { discountRateToString } from "@/lib/utils-common"
import { Coupon, Order, OrderItem, Product } from "@prisma/client"
import { useState } from "react"

export default function OrderItemComponent({
  order
}: {
  order: Order & { items: (OrderItem & { product: Product })[]; couponUsed: Coupon | null }
}) {
  const [shippedAt, setShippedAt] = useState(order.shippedAt)
  const price = Math.round(
    order.items.reduce((accumulator, { purchasePrice, quantity }) => accumulator + purchasePrice * quantity, 0) *
      (order.couponUsed?.discountRate ?? 1)
  )

  const shipOrder = async () => {
    const response = await fetch(`/admin/api/ship-order/${order.id}`, { method: "POST" })
    const shippedAt = new Date(((await response.json()) as ShipOrderResponse).shippedAt)
    setShippedAt(shippedAt)
  }

  return (
    <ol key={order.id} className="list-group mb-3">
      <li className="list-group-item p-4 d-flex justify-content-between align-items-start">
        <div>
          <h2>Order #{order.id}</h2>
          <div className="text-secondary">
            {order.orderedAt.toDateString()} ordered
            {shippedAt && ` • ${shippedAt.toDateString()} shipped`}
            {` • $${price}`}
            {order.couponUsed && ` • ${discountRateToString(order.couponUsed.discountRate)}`}
          </div>
        </div>
        {shippedAt === null && (
          <div className="d-flex" onClick={shipOrder}>
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
  )
}
