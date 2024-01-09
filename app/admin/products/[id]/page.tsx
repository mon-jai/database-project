import ProductForm from "../ProductForm"
import prisma from "@/lib/prisma"

export default async function Products({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: parseInt(id) } })

  return (
    <>
      <h1 className="mb-3">Edit Product {id}</h1>

      <ProductForm product={product || undefined} />
    </>
  )
}
