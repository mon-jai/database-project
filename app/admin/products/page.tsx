import { ProductItem } from "@/components/ProductItem"
import prisma from "@/lib/prisma"
import { discountRateToString } from "@/lib/utils"

export default async function () {
  const products = await prisma.product.findMany({
    orderBy: [{ id: "asc" }]
  })

  return (
    <>
      <h1 className="mb-3">Admin / Products</h1>

      <ol className="list-group mb-3">
        {products.map(product => (
          <ProductItem key={product.id} product={product} image={false}>
            <button className="btn btn-success">Edit</button>
            <button className="btn btn-danger">Delete</button>
          </ProductItem>
        ))}
      </ol>
    </>
  )
}
