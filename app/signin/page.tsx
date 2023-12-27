"use client"

import type { User } from ".prisma/client"
import { redirect } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

type UserInput = Pick<User, "username" | "password">

export default function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<UserInput>()

  const onSubmit: SubmitHandler<UserInput> = async data => {
    const response = await fetch("signin/api", { method: "POST", body: JSON.stringify(data) })
    if (response.status === 200) redirect("/")
    else setError("password", await response.json())
  }

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
