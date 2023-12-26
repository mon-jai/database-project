import prisma from "@/lib/prisma"
import { compare, hash } from "bcrypt"

export async function hashPassword(password: string) {
  return hash(password, 2)
}

export async function isPasswordCorrect(username: string, password: string) {
  const passwordInDatabase = (await prisma.user.findFirst({ where: { username } }))?.password
  if (passwordInDatabase === undefined) return false

  return compare(password, passwordInDatabase)
}
