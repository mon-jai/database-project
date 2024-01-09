"use client"

import { UserInput } from "@/lib/types"
import { fileToBase64 } from "@/lib/utils-shared"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

type UserFormData = UserInput & { avatar: FileList }

export default function UserForm( {user}: {user?: User}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserFormData>()
  const router = useRouter()

  const onSubmit: SubmitHandler<UserFormData> = async data => {
    const user: UserInput = {
      ...data,
      avatar: await fileToBase64(data.avatar[0])
    }

    const response = await fetch("api/users", { method: "POST", body: JSON.stringify(user) })
    if (response.status === 200) router.push("/")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-5 m-auto gap-2">
      <div className="form-group mb-3">
        <label className="form-label">Username</label>
        <input {...register("username", { required: true })} defaultValue={user?.username ?? ""} className="form-control" />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Password</label>
        <input {...register("password", { required: true })} defaultValue={user?.password ?? ""} className="form-control" type="password" />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Avatar</label>
        <input {...register("avatar", { required: true })} defaultValue={user?.avatar ?? ""} className="form-control" type="file" />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Email</label>
        <input {...register("email", { required: true })} defaultValue={user?.email ?? ""} className="form-control" type="email" />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Phone Number</label>
        <input {...register("phoneNumber", { required: true })} defaultValue={user?.phoneNumber ?? ""} className="form-control" type="tel" />
      </div>

      {Object.keys(errors).length > 0 && <div>error.message</div>}

      <button className="btn btn-success" type="submit">
        {user === undefined ? "Sign up": "Update"}
      </button>
    </form>
  )
}
