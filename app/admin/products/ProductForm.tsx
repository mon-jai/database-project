"use client"

import { Prisma } from "@prisma/client"
import { redirect } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

type ProductInput = Omit<Prisma.ProductCreateArgs, "images"> & { image_1: string; image_2: string; image_3: string }

export default function ({ product }: { product?: Product }) {
  const { register, handleSubmit } = useForm<ProductInput>()

  const onSubmit: SubmitHandler<ProductInput> = async data => {
    const response = await fetch("admin/api/product" + (product !== undefined ? "/" + product.id : ""), {
      method: "POST",
      body: JSON.stringify(data)
    })
    if (response.status === 200) redirect("/orders")
  }

  return (
    <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-3">
        <label className="form-label">Address</label>
        <input className="form-control" value={address} disabled />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Address</label>
        <input className="form-control" value={address} disabled />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Address</label>
        <input className="form-control" value={address} disabled />
      </div>
      <div className="form-group mb-3">
        <label className="form-label">Address</label>
        <input className="form-control" value={address} disabled />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Address</label>
        <input className="form-control" value={address} disabled />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Address</label>
        <input className="form-control" value={address} disabled />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Address</label>
        <input className="form-control" value={address} disabled />
      </div>

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
    </form>
  )
}
