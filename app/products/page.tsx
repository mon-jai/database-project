import ProductGrid from "@/app/products/product-grid"
import TablePlaceholder from "@/app/products/table-placeholder"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

export default function Products({ searchParams: { page = "0" } }: { searchParams: { page: string } }) {
  return (
    <>
      <Suspense fallback={<TablePlaceholder />}>
        <ProductGrid page={parseInt(page)} />
      </Suspense>
    </>
  )
}
