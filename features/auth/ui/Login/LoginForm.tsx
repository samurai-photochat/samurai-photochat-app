"use client"
import s from "./LoginForm.module.css"
import { Form } from "radix-ui"
import Image from "next/image"
import googleIcon from "@/shared/assets/img/google-icon.png"
import githubIcon from "@/shared/assets/img/github-icon.png"
import { Button } from "@radix-ui/themes"
import * as React from "react"
import { useForm } from "react-hook-form"
import { LoginInputs, loginSchema } from "@/shared/lib/signUpSchema/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { TextField } from "@/shared/ui/text-field/text-field"

type Props = {
  submitAction: ({ email, password }: { email: string; password: string }, reset: () => void) => void
}

export default function LoginForm({ submitAction }: Props) {
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
    submitAction(data, reset)
  }
  const providers = [
    { name: "Google", icon: googleIcon, href: "" },
    { name: "GitHub", icon: githubIcon, href: "" },
  ]
  return (
    <div className={s.page}>
      <Form.Root className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={s.h1}>Sign In</h1>
        <div className={s.iconRow}>
          {providers.map(({ name, icon, href }) => (
            <a key={name} href={href}>
              <Image src={icon} alt={name} />
            </a>
          ))}
        </div>
        <Form.Field name="email" className={s.field}>
          <Form.Label className={s.label}>Email</Form.Label>
          <Form.Control asChild>
            <input type="email" className={s.input} {...register("email")} />
          </Form.Control>
          {errors.email && <div className={s.message}>{errors.email.message}</div>}
        </Form.Field>
        <Form.Field name="password" className={s.field}>
          <Form.Label className={s.label}>Password</Form.Label>
          <Form.Control asChild>
            <TextField
              type={passwordType}
              password
              label={undefined}
              errorMessage={errors.password?.message}
              iconAction={() => setPasswordType(passwordType === "password" ? "text" : "password")}
              {...register("password")}
            />
          </Form.Control>
          {errors.password && <div className={s.message}>{errors.password.message}</div>}
        </Form.Field>
        <span className={s.span}>
          <a href={""} className={`${s.span} ${s.grayText} ${s.a}`}>
            Forgot Password
          </a>
        </span>
        <Button type={"submit"} className={s.button} variant={"classic"}>
          Sign In
        </Button>
        <span className={s.whiteText}>{`Don't have an account?`}</span>
        <a className={`${s.a} ${s.blueText}`} href={""}>
          Sign Up
        </a>
      </Form.Root>
    </div>
  )
}
