import CouponForm from "./CouponForm"
import DeleteCouponButton from "./DeleteCouponButton"
import prisma from "@/lib/prisma"

export default async function Coupons() {
  const coupons = await prisma.coupon.findMany({
    include: { customer: { select: { user: { select: { username: true } } } } }
  })

  return (
    <>
      <h1 className="mb-3">Shopping Cart</h1>

      <ol className="list-group">
        {coupons.map(coupon => (
          <div key={coupon.id} className="list-group-item d-flex align-items-center">
            <div className="me-auto">
              <div className="fw-bold text-body text-decoration-none">{coupon.customer.user.username}</div>
              <div className="text-secondary">${coupon.discountRate}</div>
            </div>

            <div className="d-flex align-items-center gap-4">
              <DeleteCouponButton id={coupon.id} />
            </div>
          </div>
        ))}
      </ol>

      <CouponForm />
    </>
  )
}
