"use client"

export function RemoveButton({ productId }: { productId: number }) {
  const removeProduct = () => fetch("api/shopping-cart", { method: "DELETE", body: JSON.stringify({ productId }) })

  return (
    <div className="d-flex justify-content-end">
      <div className="d-flex align-items-center p-1 me-4">
        <div
          className="btn btn-sm btn-light rounded-circle p-0 d-flex justify-content-center align-items-center"
          style={{ width: "2rem", aspectRatio: "1 / 1" }}
        >
          +
        </div>
        <div className="mx-2">1</div>
        <div
          className="btn btn-sm btn-light rounded-circle p-0 d-flex justify-content-center align-items-center"
          style={{ width: "2rem", aspectRatio: "1 / 1" }}
        >
          -
        </div>
      </div>
      <button className="btn btn-success">Remove</button>
    </div>
  )
}
