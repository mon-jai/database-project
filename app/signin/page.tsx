"use client"

import type { User } from ".prisma/client"
import { SubmitHandler, useForm } from "react-hook-form"

type UserInput = Pick<User, "username" | "password">

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<User>()

  const onSubmit: SubmitHandler<UserInput> = data => fetch("signin/api", { method: "POST", body: JSON.stringify(data) })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <span>username</span>
        <input {...register("username", { required: true })} />
      </div>
      <div>
        <span>password</span>
        <input {...register("password", { required: true })} />
      </div>
      {Object.keys(errors).length > 0 && <div>This field is required</div>}
      <input type="submit" />
    </form>
  )
}
