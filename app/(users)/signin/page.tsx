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
    const response = await fetch("/api/signin", { method: "POST", body: JSON.stringify(data) })
    if (response.status === 200) redirect("/")
    else {
      const errors = response.json()
      for (const [name, message] of Object.entries(errors)) {
        setError(name as keyof UserInput, { message: message })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <span>Username</span>
        <input {...register("username", { required: true })} />
      </div>
      <div>
        <span>Password</span>
        <input {...register("password", { required: true })} />
      </div>
      {Object.keys(errors).length > 0 && <div>error.message</div>}
      <input type="submit" />
    </form>
  )
}
