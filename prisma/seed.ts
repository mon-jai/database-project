import { readFile } from "fs/promises"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

import { Prisma } from "@prisma/client"

import prisma from "../lib/prisma.js"
import _products from "./products.json" with { "type": "json" }

try {
  const products = _products as any as Prisma.ProductUncheckedCreateInput[]
  await Promise.all(
    products.map(product => prisma.product.upsert({ where: { id: product.id }, update: {}, create: product }))
  )

  const __dirname = dirname(fileURLToPath(import.meta.url))
  const sqlString = await readFile(resolve(__dirname, "seed.sql"), { encoding: "utf-8" })
  const sqlStatements = sqlString
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0 && !line.startsWith("--"))
    .join("\n")
    .replaceAll(/([^;])\n/g, (_match, p1) => p1)
    .split("\n")
  for (const sql of sqlStatements) await prisma.$executeRawUnsafe(sql)

  // `setval` sometime causes error when running right after other seeding operations
  await prisma.$disconnect()
  await prisma.$connect()

  // https://stackoverflow.com/a/18508719/
  const tableNames = (
    await prisma.$queryRaw<{ relname: string }[]>`
      SELECT pg_class.relname
      FROM pg_class INNER JOIN pg_attribute ON pg_attribute.attrelid = pg_class.oid
      WHERE pg_attribute.attname = 'id' AND pg_class.relkind = 'r'
    `
  ).map(({ relname }) => relname)
  // https://github.com/prisma/prisma/discussions/5256#discussioncomment-1191352
  for (const tableName of tableNames) {
    await prisma.$executeRawUnsafe(`
      SELECT setval (pg_get_serial_sequence ('"${tableName}"', 'id'), COALESCE(MAX(id) + 1, 1), FALSE)
      FROM public."${tableName}";
    `)
  }
} catch (e) {
  console.error(e)
  process.exitCode = 1
} finally {
  await prisma.$disconnect()
}
