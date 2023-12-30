import prisma from "@/lib/prisma"
import { range } from "lodash"
import Link from "next/link"

const PRODUCTS_PER_PAGE = 9

export const dynamic = "force-dynamic"

export default async function Products({
  searchParams: { page: pageString = "0" }
}: {
  searchParams: { page: string }
}) {
  const page = parseInt(pageString)
  const noOfPages = Math.ceil((await prisma.product.count()) / 9)
  const products = await prisma.product.findMany({
    skip: page * PRODUCTS_PER_PAGE,
    take: PRODUCTS_PER_PAGE,
    orderBy: [{ id: "asc" }]
  })

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
      ))}
      <div>
        {range(noOfPages).map(index => (
          <Link
            href={`/products?page=${index + 1}`}
            style={index + 1 === page ? { backgroundColor: "blue" } : {}}
            suppressHydrationWarning={true}
          >
            {index + 1}
          </Link>
        ))}
      </div>
    </div>
  )
}
