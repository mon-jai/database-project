"use client"

import QuantityInput, { QuantityInputValues } from "@/components/QuantityInput"
import { redirect } from "next/navigation"
import { SubmitHandler } from "react-hook-form"

export default function TEMP({ productId }: { productId: number }) {
  const onSubmit: SubmitHandler<QuantityInputValues> = async ({ quantity }) => {
    const response = await fetch("api/shopping-cart", { method: "POST", body: JSON.stringify({ productId, quantity }) })
    if (response.status === 200) redirect("/orders")
  }

  return <QuantityInput label="Add to cart" onSubmit={onSubmit} />
}
