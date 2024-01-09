"use client"

import { ProductInput } from "@/lib/types"
import { fileToBase64 } from "@/lib/utils-shared"
import { Product } from "@prisma/client"
import { useRouter } from "next/router"
import { ChangeEvent } from "react"
import { SubmitHandler, UseFormSetValue, useForm } from "react-hook-form"

type ProductFormData = ProductInput & {
  id: string
  image_0: string
  image_1: string
  image_2: string
}

function FileInput({
  name,
  image,
  setValue
}: {
  name: keyof ProductFormData
  image?: string
  setValue: UseFormSetValue<ProductFormData>
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

export default function ProductForm({ product }: { product?: Product }) {
  const { register, setValue, handleSubmit } = useForm<ProductFormData>()
  const router = useRouter()

  const onSubmit: SubmitHandler<ProductFormData> = async data => {
    const response = await fetch("admin/api/product" + (product !== undefined ? "/" + product.id : ""), {
      method: "POST",
      body: JSON.stringify(data)
    })
    if (response.status === 200) router.push("/orders")
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

      <FileInput name="image_0" image={product?.images[0]} setValue={setValue} />
      <FileInput name="image_1" image={product?.images[1]} setValue={setValue} />
      <FileInput name="image_2" image={product?.images[2]} setValue={setValue} />
    </form>
  )
}
