import prisma from "@/lib/prisma"
import { range } from "lodash"
import Link from "next/link"

const PRODUCTS_PER_PAGE = 12

export const dynamic = "force-dynamic"

const COLUMNS_PER_ROW = 4

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
    <>
      <div className="row" style={{ gap: "1rem" }}>
        {products.map(product => (
          <Link
            href={`products/${product.id}`}
            key={product.id}
            className="card px-0 shadow-sm"
            style={{
              overflow: "hidden",
              width: `calc(100% / ${COLUMNS_PER_ROW} - 1rem * (${COLUMNS_PER_ROW - 1} / ${COLUMNS_PER_ROW}))`,
              textDecoration: "none"
            }}
          >
            <img src={product.images[0]} />

            <div className="card-body d-flex flex-column">
              <p className="card-text fw-semibold">{product.name}</p>
              <p
                className="card-text"
                style={{
                  height: "calc(var(--bs-body-font-size) * var(--bs-body-line-height) * 2)",
                  overflow: "hidden"
                }}
              >
                {product.description}
              </p>
              <div className="text-success fs-4 text-end mt-auto">${product.price}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="d-flex justify-content-center gap-3 mt-5">
        {range(noOfPages).map(index => (
          <Link
            href={`/products?page=${index + 1}`}
            style={{
              width: "1.5rem",
              height: "1.5rem",
              textAlign: "center",
              textDecoration: "none",
              ...(index === page + 1
                ? { backgroundColor: "var(--bs-green)", color: "white" }
                : { color: "var(--bs-body-color)" })
            }}
            suppressHydrationWarning={true}
          >
            {index + 1}
          </Link>
        ))}
      </div>
    </>
  )
}
