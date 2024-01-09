import prisma from "@/lib/prisma"

export default async function Coupons() {
  const coupons = await prisma.coupon.findMany()

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
