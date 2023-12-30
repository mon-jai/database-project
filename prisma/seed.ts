import prisma from "../lib/prisma.js"
import _products from "./products.json" with { "type": "json" }

const products = _products as any as Parameters<typeof prisma.product.create>[0]["data"][]

try {
  const response = await Promise.all(products.map(product => prisma.product.create({ data: product })))
  console.log(response)
} catch (e) {
  console.error(e)
  process.exitCode = 1
} finally {
  await prisma.$disconnect()
}
