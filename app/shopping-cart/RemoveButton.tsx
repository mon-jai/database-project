"use client"

export function RemoveButton({ productId }: { productId: number }) {
  const removeProduct = () => fetch("/shopping-cart/api", { method: "DELETE", body: JSON.stringify({ productId }) })

  return <div onClick={removeProduct}>Remove</div>
}
