"use client"

import { UserSignInInput } from "@/lib/types"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

export default function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<UserSignInInput>()
  const router = useRouter()

  const onSubmit: SubmitHandler<UserSignInInput> = async data => {
    const response = await fetch("/api/signin", { method: "POST", body: JSON.stringify(data) })
    if (response.status === 200) {
      // TODO: check how to rerender navbar
      window.location.href = "/"
    } else {
      const errors = response.json()
      for (const [name, message] of Object.entries(errors)) {
        setError(name as keyof UserSignInInput, { message: message })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-5 m-auto gap-2">
      <div className="form-group mb-3">
        <label className="form-label">Username</label>
        <input {...register("username", { required: true })} className="form-control" />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Password</label>
        <input {...register("password", { required: true })} className="form-control" type="password" />
      </div>

      {Object.keys(errors).length > 0 && <div>error.message</div>}

      <button className="btn btn-success" type="submit">
        Sign in
      </button>
    </form>
  )
}
