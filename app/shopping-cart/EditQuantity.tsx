"use client"

import QuantityInput, { QuantityInputValues } from "@/components/QuantityInput"
import { redirect } from "next/navigation"
import { SubmitHandler } from "react-hook-form"

export default function TEMP({ productId, quantity }: { productId: number; quantity: number }) {
  const onSubmit: SubmitHandler<QuantityInputValues> = async ({ quantity }) => {
    const response = await fetch(`api/shopping-cart/${productId}`, {
      method: "POST",
      body: JSON.stringify({ quantity })
    })
    if (response.status === 200) redirect("/orders")
  }

  return <QuantityInput label="Update" onSubmit={onSubmit} quantity={quantity} />
}
