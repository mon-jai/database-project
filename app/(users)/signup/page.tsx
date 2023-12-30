"use client"

import type { User } from ".prisma/client"
import { redirect } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

type UserToCreate = Omit<User, "id" | "createdAt" | "role">
type UserInput = UserToCreate & { avatar: FileList }

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })

export default function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<UserInput>()

  const onSubmit: SubmitHandler<UserInput> = async data => {
    const user: UserToCreate = {
      ...data,
      avatar: await toBase64(data.avatar[0])
    }

    const response = await fetch("api/users", { method: "POST", body: JSON.stringify(user) })
    if (response.status === 200) redirect("/")
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
      <div>
        <span>Avatar</span>
        <input type="file" {...register("avatar", { required: true })} />
      </div>
      <div>
        <span>Email</span>
        <input type="email" {...register("email", { required: true })} />
      </div>
      <div>
        <span>Phone number</span>
        <input type="tel" {...register("phoneNumber", { required: true })} />
      </div>

      {Object.keys(errors).length > 0 && <div>This field is required</div>}

      <input type="submit" />
    </form>
  )
}
