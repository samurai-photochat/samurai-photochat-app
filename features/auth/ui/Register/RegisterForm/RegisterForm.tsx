"use client"
import * as React from "react"
import { Form } from "radix-ui"
import Image from "next/image"
import s from "./RegisterForm.module.css"
import googleIcon from "@/shared/assets/img/google-icon.png"
import gitHubIcon from "@/shared/assets/img/github-icon.png"
import { TextField } from "@/shared/ui/text-field/text-field"
import { Button } from "@/shared/ui"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpInputs, signUpSchema } from "@/shared/lib/signUpSchema/signUpSchema"
import { UserType } from "@/features/auth/api/authApi"
import { useState } from "react"
import Checkbox from "@/shared/ui/checkbox/checkbox"

type Props = {
  submitAction: (user: UserType, reset: () => void) => void
}

export const RegisterForm = ({ submitAction }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { userName: "", email: "", password: "", confirmPassword: "", agree: false },
  })

  const [passwordType, setPasswordType] = useState("password")

  const onSubmit = (data: SignUpInputs) => {
    submitAction({ ...data, baseUrl: window.location.href }, () => {
      reset()
      setPasswordType("password")
    })
  }

  const isInvalid = Object.keys(errors).length !== 0

  return (
    <Form.Root className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={s.pageTitle}>Sign Up</h1>
      <div className={s.iconContainer}>
        <a href={""} className={s.icon}>
          <Image src={googleIcon} alt={"google-icon"} />
        </a>
        <a href={""} className={s.icon}>
          <Image src={gitHubIcon} alt={"github-icon"} />
        </a>
      </div>
      <TextField label={"Username"} errorMessage={errors.userName?.message} {...register("userName")} />
      <TextField label={"Email"} errorMessage={errors.email?.message} {...register("email")} />
      <TextField
        type={passwordType}
        password
        label={"Password"}
        errorMessage={errors.password?.message}
        iconAction={() => setPasswordType(passwordType === "password" ? "text" : "password")}
        {...register("password")}
      />
      <TextField
        type={passwordType}
        password
        label={"Password confirmation"}
        errorMessage={errors.confirmPassword?.message}
        iconAction={() => setPasswordType(passwordType === "password" ? "text" : "password")}
        {...register("confirmPassword")}
      />
      <div className={s.checkboxContainer}>
        <Controller render={({ field }) => <Checkbox {...field} />} name={"agree"} control={control} />
        <span className={s.label}>
          I agree to the <a href={"/auth/signup/TermsofService"}>Terms of Service</a> and{" "}
          <a href={"/auth/signup/PrivacyPolicy"}>Privacy Policy</a>
        </span>
      </div>
      <Button variant={"primary"} fullWidth={true} disabled={isInvalid}>
        Sign Up
      </Button>
      <span style={{ color: "var(--color-light-100)" }}>Do you have an account?</span>
      <Button variant={"text"} as={"a"} href={""}>
        Sign In
      </Button>
    </Form.Root>
  )
}
