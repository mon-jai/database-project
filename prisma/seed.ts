import { readFile } from "fs/promises"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

import prisma from "../lib/prisma.js"
import _products from "./products.json" with { "type": "json" }

const __dirname = dirname(fileURLToPath(import.meta.url))
const products = _products as any as Parameters<typeof prisma.product.create>[0]["data"][]

const sqlString = await readFile(resolve(__dirname, "seed.sql"), { encoding: "utf-8" })
const sqlStatements = sqlString
  .split("\n")
  .map(line => line.trim())
  .filter(line => line.length > 0 && !line.startsWith("--"))
  .join("\n")
  .replaceAll(/([^;])\n/g, (_match, p1) => p1)
  .split(";\n")
  .map(line => line + ";")

try {
  for (const sql of sqlStatements) await prisma.$executeRawUnsafe(sql)

  await Promise.all(
    products.map(product => prisma.product.upsert({ where: { id: product.id }, update: {}, create: product }))
  )
} catch (e) {
  console.error(e)
  process.exitCode = 1
} finally {
  await prisma.$disconnect()
}
