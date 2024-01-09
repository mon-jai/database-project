"use client"

import { CheckoutInput } from "@/lib/types"
import { creditCardNoToString } from "@/lib/utils-shared"
import { Coupon, CreditCard } from "@prisma/client"
import { useRouter } from "next/navigation"
import { InputHTMLAttributes } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

export default function CheckoutForm({
  address,
  creditCards,
  coupons
}: {
  address: string
  creditCards: CreditCard[]
  coupons: (Coupon & { _count: { order: number } })[]
}) {
  const { register, handleSubmit } = useForm<CheckoutInput>()
  const router = useRouter()

  const CouponInput = ({
    couponId,
    label,
    ...props
  }: { couponId: number | string; label: string } & InputHTMLAttributes<HTMLInputElement>) => {
    const inputId = `coupon-${couponId}`
    return (
      <label htmlFor={inputId} className="card p-3 me-3 flex-row" style={{ minWidth: "10rem" }}>
        <input {...register("couponId")} id={inputId} value={couponId} type="radio" {...props} />
        <span className="ms-2">{label}</span>
      </label>
    )
  }

  const onSubmit: SubmitHandler<CheckoutInput> = async data => {
    const response = await fetch("api/orders", {
      method: "POST",
      body: JSON.stringify({
        creditCardId: parseInt(data.creditCardId),
        ...(data.couponId !== "null" ? { couponId: parseInt(data.couponId) } : {})
      })
    })
    if (response.status === 200) router.push("/orders")
  }

  return (
    <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-3">
        <label className="form-label">Address</label>
        <input className="form-control" value={address} disabled />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Credit card</label>
        <select className="form-select" {...register("creditCardId")}>
          {creditCards.map(creditCard => (
            <option key={creditCard.id} value={creditCard.id}>
              {creditCardNoToString(creditCard.cardNo)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Coupon</label>
        <div className="d-flex">
          <CouponInput couponId={"null"} label="Do Not use coupon" defaultChecked />
          {coupons
            .filter(coupon => coupon._count.order === 0)
            .map(coupon => (
              <CouponInput key={coupon.id} couponId={coupon.id} label={`${coupon.discountRate * 100}%`} />
            ))}
        </div>
      </div>

      <button className="btn btn-success" type="submit">
        Checkout
      </button>
    </form>
  )
}
