"use client"

import { ProductInput } from "@/lib/types"
import { fileToBase64 } from "@/lib/utils-common"
import { Prisma, Product } from "@prisma/client"
import { omit } from "lodash-es"
import { useRouter } from "next/navigation"
import { ChangeEvent } from "react"
import { SubmitHandler, UseFormSetValue, useForm } from "react-hook-form"

type ProductFormData = Omit<ProductInput, "images"> & {
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
    setValue(name, await fileToBase64(event.currentTarget!.files![0]))
  }

  return (
    <div className="col-4 d-flex justify-content-stretch">
      <div className="card p-3 gap-3">
        {image && <img className="mb-auto" src={image} />}
        <input className="form-control" type="file" onChange={onChange} />
        <button onClick={() => setValue(name, "")} className="btn btn-danger">
          Remove
        </button>
      </div>
    </div>
  )
}

export default function ProductForm({ product }: { product?: Product }) {
  const { register, watch, setValue, handleSubmit } = useForm<ProductFormData>({
    defaultValues: {
      image_0: product?.images[0],
      image_1: product?.images[1],
      image_2: product?.images[2]
    }
  })
  const router = useRouter()

  const onSubmit: SubmitHandler<ProductFormData> = async data => {
    const payload: Prisma.ProductCreateArgs["data"] = {
      ...omit(data, ["image_0", "image_1", "image_2"]),
      images: [data.image_0, data.image_1, data.image_2].filter(
        imageStr => imageStr !== undefined && imageStr.length > 0
      )
    }

    const response = await fetch("/admin/api/products" + (product !== undefined ? "/" + product.id : ""), {
      method: "POST",
      body: JSON.stringify(payload)
    })
    if (response.status === 200) router.push("/admin/products")
  }

  return (
    <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-3">
        <label className="form-label">Name</label>
        <input className="form-control" {...register("name")} defaultValue={product?.name ?? ""} />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Price</label>
        <input
          className="form-control"
          {...register("price", { valueAsNumber: true })}
          defaultValue={product?.price ?? ""}
        />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Stock</label>
        <input
          className="form-control"
          {...register("stock", { valueAsNumber: true })}
          defaultValue={product?.stock ?? ""}
        />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Description</label>
        <input className="form-control" {...register("description")} defaultValue={product?.description ?? ""} />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Category</label>
        <input className="form-control" {...register("category")} defaultValue={product?.category ?? ""} />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Images</label>

        <div className="row">
          {(["image_0", "image_1", "image_2"] as const).map(imageName => (
            <FileInput name={imageName} image={watch(imageName)} setValue={setValue} key={imageName} />
          ))}
        </div>
      </div>

      <button className="btn btn-success" type="submit">
        {product === undefined ? "Create" : "Update"}
      </button>
    </form>
  )
}
