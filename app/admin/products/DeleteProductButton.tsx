"use client"

export default function DeleteProductButton({ id }: { id: number }) {
  const onclick = async () => {
    const response = await fetch(`/admin/api/products/${id}`, { method: "DELETE" })
    if (response.status === 200) window.location.reload()
  }

  return (
    <button onClick={onclick} className="btn btn-danger">
      Delete
    </button>
  )
}
