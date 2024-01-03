import { getUserFromSession } from "./lib/utils"
import { Role } from "@prisma/client"
import { redirect } from "next/navigation"

export async function middleware() {
}

export const config = {
  matcher: "/admin/(.*)"
}
