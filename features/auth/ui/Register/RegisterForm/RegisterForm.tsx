"use client"
import * as React from "react"
import { Form } from "radix-ui"
import s from "./RegisterForm.module.css"
import { TextField } from "@/shared/ui/text-field/text-field"
import { Button } from "@/shared/ui"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpInputs, signUpSchema } from "@/shared/lib/signUpSchema/signUpSchema"
import { RegisterRequest } from "@/features/auth/api/authApi.types"
import { useState } from "react"
import Checkbox from "@/shared/ui/checkbox/checkbox"
import { GoogleOAuthButton } from "@/features/auth/ui/GoogleOAuthButton"
import { GitHubOAuthButton } from "@/features/auth/ui/GitHubOAuthButton"

type Props = {
  submitAction: (user: RegisterRequest, reset: () => void) => void
  isLoading: boolean
}

export const RegisterForm = ({ submitAction, isLoading }: Props) => {
  const disableAll = isLoading || false
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
      <TextField
        label={"Username"}
        errorMessage={errors.userName?.message}
        {...register("userName")}
        disabled={disableAll}
      />
      <TextField label={"Email"} errorMessage={errors.email?.message} {...register("email")} disabled={disableAll} />
      <TextField
        type={passwordType}
        password
        label={"Password"}
        errorMessage={errors.password?.message}
        iconAction={() => setPasswordType(passwordType === "password" ? "text" : "password")}
        {...register("password")}
        disabled={disableAll}
      />
      <TextField
        type={passwordType}
        password
        label={"Password confirmation"}
        errorMessage={errors.confirmPassword?.message}
        iconAction={() => setPasswordType(passwordType === "password" ? "text" : "password")}
        {...register("confirmPassword")}
        disabled={disableAll}
      />
      <div className={s.checkboxContainer}>
        <Controller
          render={({ field }) => <Checkbox {...field} />}
          name={"agree"}
          control={control}
          disabled={disableAll}
        />
        <span className={s.label}>
          I agree to the <a href={"/auth/signup/TermsofService"}>Terms of Service</a> and{" "}
          <a href={"/auth/signup/PrivacyPolicy"}>Privacy Policy</a>
        </span>
      </div>
      <Button variant={"primary"} fullWidth={true} disabled={isInvalid}>
        Sign Up
      </Button>
      <GoogleOAuthButton text="Зарегистрироваться через Google" />
      <GitHubOAuthButton text="Зарегистрироваться через GitHub" />
      <span style={{ color: "var(--color-light-100)" }}>Do you have an account?</span>
      <Button variant={"text"} as={"a"} href={""}>
        Sign In
      </Button>
    </Form.Root>
  )
}
