"use client"

import QuantityForm from "@/components/QuantityForm"
import { QuantityInput } from "@/lib/types"
import { useRouter } from "next/navigation"
import { SubmitHandler } from "react-hook-form"

export default function AddToCartForm({ productId }: { productId: number }) {
  const router = useRouter()

  const onSubmit: SubmitHandler<QuantityInput> = async ({ quantity }) => {
    const response = await fetch("/api/shopping-cart", { method: "POST", body: JSON.stringify({ productId, quantity }) })
    if (response.status === 200) router.push("/shopping-cart")
  }

  return <QuantityForm label="Add to cart" onSubmit={onSubmit} />
}
