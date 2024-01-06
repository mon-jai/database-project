export const enum AUTHENTICATION_ERRORS {
  USER_NOT_FOUND,
  INCORRECT_PASSWORD
}

// https://stackoverflow.com/a/68261391/
export type RequiredFieldsOnly<T> = {
    [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K]
}
