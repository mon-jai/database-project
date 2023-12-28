import { RemoveButton } from "./RemoveButton"
import prisma from "@/lib/prisma"
import { getUserFromSession } from "@/lib/utils"
import { redirect } from "next/navigation"

export default async function () {
  const customerUserId = (await getUserFromSession({ select: { id: true } }))?.id
  if (customerUserId === undefined) return redirect("signin")
  const products = (await prisma.shoppingCart.findMany({ where: { customerUserId }, include: { product: true } })).map(
    ({ product }) => product
  )

  return (
    <>
      <div>Shopping Cart</div>

      {products.map(product => (
        <div>
          <img src={product.images[0]} />
          <div>{product.name}</div>
          <div>{product.price}</div>
          <RemoveButton productId={product.id} />
        </div>
      ))}
    </>
  )
}
