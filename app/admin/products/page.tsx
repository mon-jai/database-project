import DeleteProductButton from "./DeleteProductButton"
import  ProductItem  from "@/components/ProductItem"
import prisma from "@/lib/prisma"
import Link from "next/link"

export default async function Products() {
  const products = await prisma.product.findMany({
    orderBy: [{ id: "asc" }]
  })

  return (
    <>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1>Admin / Products</h1>
        <Link href="/admin/products/create" className="btn btn-success">
          Create
        </Link>
      </div>

      <ol className="list-group mb-3">
        {products.map(product => (
          <ProductItem key={product.id} product={product} image={false}>
            <Link href={`/admin/products/${product.id}`} className="btn btn-success">
              Edit
            </Link>
            <DeleteProductButton id={product.id} />
          </ProductItem>
        ))}
      </ol>
    </>
  )
}
