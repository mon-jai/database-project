import { readFile } from "fs/promises"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

import { Prisma } from "@prisma/client"

import prisma from "../lib/prisma.js"
import _products from "./products.json" with { "type": "json" }

const __dirname = dirname(fileURLToPath(import.meta.url))
const products = _products as any as Prisma.ProductUncheckedCreateInput[]

const sqlString = await readFile(resolve(__dirname, "seed.sql"), { encoding: "utf-8" })
const sqlStatements = sqlString
  .split("\n")
  .map(line => line.trim())
  .filter(line => line.length > 0 && !line.startsWith("--"))
  .join("\n")
  .replaceAll(/([^;])\n/g, (_match, p1) => p1)
  .split("\n")

try {
  await Promise.all(
    products.map(product => prisma.product.upsert({ where: { id: product.id }, update: {}, create: product }))
  )

  for (const sql of sqlStatements) await prisma.$executeRawUnsafe(sql)
} catch (e) {
  console.error(e)
  process.exitCode = 1
} finally {
  await prisma.$disconnect()
}
