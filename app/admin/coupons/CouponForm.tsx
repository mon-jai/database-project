"use client"

import { CouponInput } from "@/lib/types"
import { useRouter } from "next/navigation"
import { InputHTMLAttributes } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

export default function CouponForm() {
  const { register, handleSubmit, setError } = useForm<CouponInput>()

  const onSubmit: SubmitHandler<CouponInput> = async data => {
    const response = await fetch("admin/api/coupons", { method: "POST", body: JSON.stringify(data) })
    if (response.status === 200) window.location.reload()
    else {
      const errors = await response.json()
      for (const [field, errorText] of errors) setError(field, errorText)
    }
  }

  return (
    <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-3">
        <label className="form-label">Username</label>
        <input className="form-control" {...register("username")} />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Discount rate</label>
        <input className="form-control" {...register("discountRate", { valueAsNumber: true })} />
      </div>

      <button className="btn btn-success" type="submit">
        Add coupon
      </button>
    </form>
  )
}
