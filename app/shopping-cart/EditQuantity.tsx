"use client"

import QuantityForm from "@/components/QuantityForm"
import { QuantityInput } from "@/lib/types"
import { useRouter } from "next/router"
import { SubmitHandler } from "react-hook-form"

export default function TEMP({ productId, quantity }: { productId: number; quantity: number }) {
  const router = useRouter()

  const onSubmit: SubmitHandler<QuantityInput> = async ({ quantity }) => {
    const response = await fetch(`api/shopping-cart/${productId}`, {
      method: "POST",
      body: JSON.stringify({ quantity })
    })
    if (response.status === 200) router.push("/orders")
  }

  return <QuantityForm label="Update" onSubmit={onSubmit} quantity={quantity} />
}
