"use client"

import { useRouter } from "next/router"

export default function TEMP({ productId }: { productId: number }) {
  const router = useRouter()

  return (
    <button
      className="btn btn-danger"
      onClick={async () => {
        const response = await fetch(`api/shopping-cart/${productId}`, { method: "DELETE" })
        if (response.status === 200) router.push(".")
      }}
    >
      Remove
    </button>
  )
}
