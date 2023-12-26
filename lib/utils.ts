import { IRON_SESSION_PASSWORD } from "./constants"
import prisma from "@/lib/prisma"
import { compare, hash } from "bcrypt"
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"

export async function hashPassword(password: string) {
  return hash(password, 2)
}

export async function isPasswordCorrect(username: string, password: string) {
  const passwordInDatabase = (await prisma.user.findFirst({ where: { username } }))?.password
  if (passwordInDatabase === undefined) return false

  return compare(password, passwordInDatabase)
}

export async function getSession() {
  return getIronSession<{ username: string }>(cookies(), {
    cookieName: "user-session",
    password: IRON_SESSION_PASSWORD,
    cookieOptions: { secure: !(process.env.NODE_ENV === "development") }
  })
}
