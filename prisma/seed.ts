import { range } from "lodash-es"

import prisma from "../lib/prisma.js"

try {
  const response = await Promise.all(
    range(100).map(index =>
      prisma.product.create({
        data: {
          id: index,
          name: `Product ${index}`,
          category: "",
          price: index * 100,
          stock: 10,
          description: `Description ${index}`,
          images: []
        }
      })
    )
  )
  console.log(response)
} catch (e) {
  console.error(e)
  process.exitCode = 1
} finally {
  await prisma.$disconnect()
}
