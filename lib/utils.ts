import { IRON_SESSION_PASSWORD } from "./constants"
import prisma from "@/lib/prisma"
import { Prisma, User } from "@prisma/client"
import { compare, hash } from "bcrypt"
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"

export async function hashPassword(password: string) {
  return hash(password, 2)
}

export async function authenticate(username: string, password: string) {
  const passwordInDatabase = (await prisma.user.findFirst({ where: { username }, select: { password: true } }))
    ?.password
  if (passwordInDatabase === undefined) throw AUTHENTICATION_ERRORS.USER_NOT_FOUND
  if ((await compare(password, passwordInDatabase)) === false) throw AUTHENTICATION_ERRORS.INCORRECT_PASSWORD
}

export async function getSession() {
  return getIronSession<{ username: string }>(cookies(), {
    cookieName: "user-session",
    password: IRON_SESSION_PASSWORD,
    cookieOptions: { secure: !(process.env.NODE_ENV === "development") }
  })
}

export async function getUserFromSession<T extends Prisma.UserFindFirstArgs>(
  props: T
): Promise<ReturnType<typeof prisma.user.findFirst<T>>> {
  const username = (await getSession()).username
  if (username === undefined) return null

  props.where ??= {}
  props.where.username = username

  // @ts-expect-error
  return prisma.user.findFirst(props)
}

export async function getRoleFromSession() {
  return (await getUserFromSession({ select: { role: true } }))?.role
}
