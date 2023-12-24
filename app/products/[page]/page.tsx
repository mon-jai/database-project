import ProductGrid from "@/app/products/[page]/product-grid"
import TablePlaceholder from "@/app/products/[page]/table-placeholder"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

export default function Home({ params: { page } }: { params: { page: string } }) {
  return (
    <>
      <Suspense fallback={<TablePlaceholder />}>
        <ProductGrid page={parseInt(page)} />
      </Suspense>
    </>
  )
}
