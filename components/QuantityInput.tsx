"use client"

import { MouseEventHandler } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

export type QuantityInputValues = { quantity: number }

const ArithmeticButton = ({ label, onClick }: { label: string; onClick: MouseEventHandler }) => (
  <div
    className="btn btn-sm btn-light rounded-circle p-0 d-flex justify-content-center align-items-center"
    style={{ width: "2rem", aspectRatio: "1 / 1" }}
    onClick={onClick}
  >
    {label}
  </div>
)

export default function QuantityInput({
  label,
  className,
  quantity = 1,
  onSubmit
}: {
  label: string
  className?: string
  quantity: number
  onSubmit: SubmitHandler<QuantityInputValues>
}) {
  const { register, handleSubmit, setValue, getValues } = useForm<QuantityInputValues>({ defaultValues: { quantity } })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`d-flex justify-content-end ${className ?? ""}`}>
      <div className="d-flex align-items-center p-1 me-3">
        <ArithmeticButton label="-" onClick={() => setValue("quantity", getValues("quantity") - 1)} />
        <input className="checkout-input p-0 border-0 mx-2" type="number" {...register("quantity", {})} />
        <ArithmeticButton label="+" onClick={() => setValue("quantity", getValues("quantity") + 1)} />
      </div>
      <button className="btn btn-success" type="submit">
        {label}
      </button>
    </form>
  )
}
