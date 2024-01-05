import { Product } from "@prisma/client"
import Link from "next/link"
import { PropsWithChildren } from "react";

export function ProductItem({
  product,
  children,
  image
}: PropsWithChildren<{ product: Product; image?: boolean }>) {
  return (
    <div key={product.id} className="list-group-item d-flex align-items-center">
      {image && <img className="me-3" style={{ width: "5rem", aspectRatio: "1 / 1" }} src={product.images[0]} />}

      <div className="me-auto">
        <Link href={`/products/${product.id}`} className="fw-bold text-body text-decoration-none">
          {product.name}
        </Link>
        <div className="text-success">${product.price}</div>
      </div>

      <div className="d-flex align-items-center gap-4">{children}</div>
    </div>
  )
}
