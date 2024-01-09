import { Prisma, User } from "@prisma/client";


export const enum AUTHENTICATION_ERRORS {
  USER_NOT_FOUND,
  INCORRECT_PASSWORD
}

export type UserInput = Omit<User, "id" | "createdAt" | "role">

export type UserSignInInput = Pick<User, "username" | "password">

export type CreditCardInput = Omit<RequiredFieldsOnly<Prisma.CreditCardUncheckedCreateInput>, "customerUserId">

export type CheckoutInput = { creditCardId: string; couponId: string }

export type ProductInput = RequiredFieldsOnly<Prisma.ProductUncheckedCreateInput>

export type QuantityInput = { quantity: number }

export type CouponInput = { username: string; discountRate: number }

export type ShipOrderResponse = { shippedAt: number }

// https://stackoverflow.com/a/68261391/
export type RequiredFieldsOnly<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K]
}