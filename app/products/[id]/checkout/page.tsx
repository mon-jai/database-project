import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

// TODO
// TODO: Redirect if no credit card
export default async function ({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: parseInt(id) } })
  if (product === null) return notFound()

  return (
    <div>
      <div>{product.name}</div>
      <div>{product.modifiedAt.toString()}</div>
      <div>{product.category}</div>
      <div>{product.price}</div>
      <div>{product.stock}</div>
      <div>{product.description}</div>
      {product.images.map(image => (
        <img src={image} />
      ))}
    </div>
  )
}
