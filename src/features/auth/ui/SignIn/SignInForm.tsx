"use client"
import s from "./LoginForm.module.scss"
import { Form } from "radix-ui"
import Image from "next/image"
import googleIcon from "@/shared/assets/img/google-icon.png"
import githubIcon from "@/shared/assets/img/github-icon.png"
// import { Button } from "@radix-AccountManagement/themes"
import * as React from "react"
import { useForm } from "react-hook-form"
import { LoginInputs, loginSchema } from "@/shared/schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { TextField } from "@/shared/ui/TextField"
import { Button } from "@/shared/ui"
import { PATH } from "@/shared/config/routes"
import { PasswordField } from "@/shared/ui/PasswordField/PasswordField"

type Props = {
  submitAction: ({ email, password }: { email: string; password: string }, reset: () => void) => void
  error?: string
}

export default function SignInForm({ submitAction, error = "" }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })
  const [passwordType, setPasswordType] = useState("password")
  const onSubmit = (data: LoginInputs) => {
    submitAction(data, () => {
      reset()
      setPasswordType("password")
    })
  }
  const providers = [
    { name: "Google", icon: googleIcon, href: "" },
    { name: "GitHub", icon: githubIcon, href: "" },
  ]
  return (
    <Form.Root className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={s.h1}>Sign In</h1>
      <div className={s.iconRow}>
        {providers.map(({ name, icon, href }) => (
          <a key={name} href={href}>
            <Image src={icon} alt={name} />
          </a>
        ))}
      </div>
      <TextField label={"Email"} errorMessage={errors.email?.message} {...register("email")} />
      <PasswordField
        type={passwordType}
        errorMessage={errors.password?.message || error}
        iconAction={() => setPasswordType(passwordType === "password" ? "text" : "password")}
        {...register("password")}
      />
      <span className={s.span}>
        <a href={""} className={`${s.span} ${s.grayText} ${s.a}`}>
          Forgot Password
        </a>
      </span>
      <Button type={"submit"} className={s.button} variant={"primary"}>
        Sign In
      </Button>
      <span className={s.whiteText}>{`Don't have an account?`}</span>
      <Button as={"a"} variant={"text"} href={PATH.AUTH.REGISTRATION}>
        Sign Up
      </Button>
    </Form.Root>
  )
}
