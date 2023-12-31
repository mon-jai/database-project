"use client"

import { QuantityInput } from "@/lib/types"
import { MouseEventHandler } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

const ArithmeticButton = ({ label, onClick }: { label: string; onClick: MouseEventHandler }) => (
  <div
    className="btn btn-light rounded-circle p-0 fs-5 d-flex justify-content-center align-items-center"
    style={{ width: "2rem", aspectRatio: "1 / 1" }}
    onClick={onClick}
  >
    {label}
  </div>
)

export default function QuantityForm({
  label,
  className,
  quantity = 1,
  onSubmit
}: {
  label: string
  className?: string
  quantity?: number
  onSubmit: SubmitHandler<QuantityInput>
}) {
  const { register, handleSubmit, setValue, getValues } = useForm<QuantityInput>({ defaultValues: { quantity } })

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
