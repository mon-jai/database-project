"use client"

import { redirect } from "next/navigation"

export default function ({ productId }: { productId: number }) {
  return (
    <button
      className="btn btn-danger"
      onClick={async () => {
        const response = await fetch(`api/shopping-cart/${productId}`, { method: "DELETE" })
        if (response.status === 200) redirect(".")
      }}
    >
      Remove
    </button>
  )
}
