import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function ({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: parseInt(id) } })
  if (product === null) return notFound()

  return (
    <div className="row gx-3 overflow-hidden ">
      <div className="col-4">
        <img src={product.images[0]} style={{ width: "100%" }} />
        {product.images.length}
        {product.images.slice(1).map(image => (
          <img src={image} style={{ width: "100%" }} />
        ))}
      </div>

      <div className="col-8">
        <div className="card p-5">
          <h1 className="fs-2">{product.name}</h1>
          <div>{product.modifiedAt.toString()}</div>
          <div>{product.category}</div>
          <div>{product.price}</div>
          <div>{product.stock}</div>
          <div>{product.description}</div>
        </div>
      </div>
    </div>
  )
}
