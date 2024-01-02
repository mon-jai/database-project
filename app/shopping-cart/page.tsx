import { RemoveButton } from "./RemoveButton"
import prisma from "@/lib/prisma"
import { getUserFromSession } from "@/lib/utils"
import { redirect } from "next/navigation"

export default async function () {
  const user = await getUserFromSession({
    select: { id: true, customer: { select: { address: true, creditCards: true } } }
  })
  if (user?.id === undefined) return redirect("/signin")
  if (user.customer === null || user.customer.address === null) return redirect("/edit-info")

  const products = (
    await prisma.shoppingCart.findMany({ where: { customerUserId: user.id }, include: { product: true } })
  ).map(({ product }) => product)

  return (
    <>
      <h1 className="mb-3">Shopping Cart</h1>

      <ol className="list-group">
        {products.map(product => (
          <li key={product.id} className="list-group-item d-flex align-items-center">
            <img style={{ width: "5rem", aspectRatio: "1 / 1" }} src={product.images[0]} />

            <div className="ms-3 me-auto">
              <div className="fw-bold">{product.name}</div>
              <div className="text-success">${product.price}</div>
            </div>
            <div>
              <RemoveButton productId={product.id} />
            </div>
          </li>
        ))}
      </ol>

      <form className="mt-3">
        <div className="form-group mb-3">
          <label>Address</label>
          <input className="form-control" value={user.customer.address} disabled />
        </div>
        <div className="form-group mb-3">
          <label>Credit card</label>
          <select className="form-select" aria-label="Default select example">
            {user.customer.creditCards.map(creditCard => (
              // https://stackoverflow.com/a/50955590/
              <option value={creditCard.id}>
                {creditCard.cardNo
                  .split(/(.{4})/)
                  .filter(Boolean)
                  .join("-")}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-success">Checkout</button>
      </form>
    </>
  )
}
