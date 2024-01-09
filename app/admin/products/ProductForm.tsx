"use client"

import { RequiredFieldsOnly } from "@/lib/types"
import { fileToBase64 } from "@/lib/utils-shared"
import { Prisma } from "@prisma/client"
import { redirect } from "next/navigation"
import { ChangeEvent } from "react"
import { SubmitHandler, UseFormSetValue, useForm } from "react-hook-form"

type ProductInput = RequiredFieldsOnly<Omit<Prisma.ProductCreateArgs["data"], "images">> & {
  id: string
  image_1: string
  image_2: string
  image_3: string
}

function FileInput({
  setValue,
  name,
  image
}: {
  setValue: UseFormSetValue<ProductInput>
  name: keyof ProductInput
  image: string
}) {
  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setValue(name, await fileToBase64(event.currentTarget.value as any as File))
  }

  return (
    <div className="form-group">
      {image && <img src={image} />}
      <input className="form-control" type="file" onChange={onChange} />
      <button onClick={() => setValue(name, "")}>Remove</button>
    </div>
  )
}

export default function TEMP({ product }: { product?: ProductInput }) {
  const { register, setValue, handleSubmit } = useForm<ProductInput>()

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
        <label className="form-label">Name</label>
        <input className="form-control" {...register("name")} defaultValue={product?.name ?? ""} />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Price</label>
        <input className="form-control" {...register("price")} defaultValue={product?.price ?? ""} />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Stock</label>
        <input className="form-control" {...register("stock")} defaultValue={product?.stock ?? ""} />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Description</label>
        <input className="form-control" {...register("description")} defaultValue={product?.description ?? ""} />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Category</label>
        <input className="form-control" {...register("category")} defaultValue={product?.category ?? ""} />
      </div>


    </form>
  )
}
