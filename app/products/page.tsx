"use client"
import ProductGrid from "@/app/products/product-grid"
import TablePlaceholder from "@/app/products/table-placeholder"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

export default function Products() {
  const page = useSearchParams().get("page") ?? "0"

  return (
    <>
      <Suspense fallback={<TablePlaceholder />}>
        <ProductGrid page={parseInt(page)} />
      </Suspense>
    </>
  )
}
