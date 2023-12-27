import prisma from "@/lib/prisma"

export default function ({ params: { id } }: { params: { id: string } }) {
  const product = prisma.product.findUnique({ where: { id: parseInt(id) } })
  return (
    <div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
