"use client"

import { CreditCardInput } from "@/lib/types"
import { useRouter } from "next/navigation"
import { InputHTMLAttributes } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

export default function CheckoutForm() {
  const { register, handleSubmit } = useForm<CreditCardInput>()
  const router = useRouter()

  const onSubmit: SubmitHandler<CreditCardInput> = async data => {
    const response = await fetch("api/credit-cards", {
      method: "POST",
      body: JSON.stringify(data)
    })
    if (response.status === 200) router.push("/orders")
  }

  return (
    <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-3">
        <label className="form-label">Credit Card Number</label>
        <input className="form-select" {...register("cardNo")} />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Security Code</label>
        <input className="form-select" {...register("securityCode")} />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Expiration (MM/YYYY)</label>
        <input className="form-select" {...register("expirationMonth")} />
        <input className="form-select" {...register("expirationYear")} />
      </div>

      <button className="btn btn-success" type="submit">
        Add Credit Card
      </button>
    </form>
  )
}
