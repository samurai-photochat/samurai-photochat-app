"use client"
import { TextField } from "@/shared/ui/TextField"
import s from "./UserForm.module.scss"
import { Controller, useForm } from "react-hook-form"
import { UserInputs, userSchema } from "@/features/settings/ui"
import { SelectBox } from "@/shared/ui/SelectBox"
import { Textarea } from "@/shared/ui/textarea/textarea"
import { Calendar } from "@/shared/ui/Calendar"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

type Props = {
  submitAction: (data: UserInputs) => void
  data?: UserInputs
  setError: (value: boolean) => void
}

export const UserForm = ({ submitAction, setError, data }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserInputs>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userName: data?.userName || "",
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      dateOfBirth: data?.dateOfBirth || "",
      country: data?.country || "",
      city: data?.city || "",
      aboutMe: data?.aboutMe || "",
    },
    mode: "onChange",
    values: {
      userName: data?.userName || "",
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      dateOfBirth: data?.dateOfBirth || "",
      country: data?.country || "",
      city: data?.city || "",
      aboutMe: data?.aboutMe || "",
    },
  })

  const onSubmit = async (data: UserInputs) => {
    submitAction(data)
  }

  const countries = ["Russia", "Belarus"]
  const cities = ["Moscow", "Minsk"]

  useEffect(() => {
    setError(Object.keys(errors).length !== 0)
  }, [errors, setError])

  return (
    <form id={"user-form"} className={s.inputsContainer} onSubmit={handleSubmit(onSubmit)}>
      <TextField required label={"User name"} errorMessage={errors.userName?.message} {...register("userName")} />
      <TextField required label={"First Name"} errorMessage={errors.firstName?.message} {...register("firstName")} />
      <TextField required label={"Last Name"} errorMessage={errors.lastName?.message} {...register("lastName")} />
      <Controller
        render={({ field: { value, onChange } }) => (
          <Calendar
            label={"Select date"}
            errorMessage={errors.dateOfBirth?.message}
            value={value}
            onChange={onChange}
          />
        )}
        name={"dateOfBirth"}
        control={control}
      />
      <div className={s.location}>
        <Controller
          render={({ field: { value, onChange } }) => (
            <SelectBox
              value={value}
              className={s.select}
              options={countries}
              label={"Select your country"}
              onChange={onChange}
            />
          )}
          name={"country"}
          control={control}
        />
        <Controller
          render={({ field: { value, onChange } }) => (
            <SelectBox
              value={value}
              className={s.select}
              options={cities}
              label={"Select your city"}
              onChange={onChange}
            />
          )}
          name={"city"}
          control={control}
        />
      </div>
      <Textarea label={"About Me"} {...register("aboutMe")} />
    </form>
  )
}
