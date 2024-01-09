import { Prisma, User } from "@prisma/client"

export const enum AUTHENTICATION_ERRORS {
  USER_NOT_FOUND,
  INCORRECT_PASSWORD
}

export type UserInput = Omit<User, "id" | "createdAt" | "role">
export type UserSignInInput = Pick<User, "username" | "password">
export type CheckoutInput = { creditCardId: string; couponId: string }
export type ProductInput = RequiredFieldsOnly<Omit<Prisma.ProductCreateArgs["data"], "images">>

export type QuantityInput = { quantity: number }

// https://stackoverflow.com/a/68261391/
export type RequiredFieldsOnly<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K]
}
