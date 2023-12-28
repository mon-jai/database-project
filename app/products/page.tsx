import ProductGrid from "@/app/products/ProductGrid"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

export default function Products({ searchParams: { page = "0" } }: { searchParams: { page: string } }) {
  return (
    <>
      <Suspense fallback={<div>Placeholder</div>}>
        <ProductGrid page={parseInt(page)} />
      </Suspense>
    </>
  )
}
