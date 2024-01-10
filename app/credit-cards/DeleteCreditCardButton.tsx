"use client"

import { useRouter } from "next/navigation"

export default function DeleteCreditCardButton({ id }: { id: number }) {
  const router = useRouter()

  return (
    <button
      className="btn btn-danger"
      onClick={async () => {
        const response = await fetch(`api/credit-cards/${id}`, { method: "DELETE" })
        if (response.status === 200) window.location.reload()
      }}
    >
      Remove
    </button>
  )
}
