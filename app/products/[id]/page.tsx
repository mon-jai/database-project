import AddToCartForm from "./AddToCartForm"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function ({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: parseInt(id) } })
  if (product === null) return notFound()

  return (
    <div className="row gx-5 overflow-hidden ">
      <div className="col-4">
        <img className="mb-3" src={product.images[0]} style={{ width: "100%" }} />
        <div className="row gx-3">
          {product.images.map((image, index) => (
            <div className="col-4">
              <img
                src={image}
                className={"rounded-3 " + (index === 0 ? "border border-3 border-success" : "")}
                key="index"
                style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="col-8">
        <div className="card p-5">
          <h1 className="fs-2">{product.name}</h1>
          <div className="text-success fs-4 text-end mb-4">${product.price}</div>

          <p>{product.description}</p>

          <table className="table">
            <tbody>
              <tr>
                <th>Modified at</th>
                <td>{product.modifiedAt.toDateString()}</td>
              </tr>
              <tr>
                <th>Stock</th>
                <td>{product.stock}</td>
              </tr>
            </tbody>
          </table>

          <AddToCartForm productId={product.id} />
        </div>
      </div>
    </div>
  )
}
