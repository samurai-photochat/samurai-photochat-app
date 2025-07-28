"use client"
import * as React from "react"
import { Form } from "radix-ui"
import Image from "next/image"
import s from "./RegisterForm.module.css"
import googleIcon from "@/shared/assets/img/google-icon.png"
import gitHubIcon from "@/shared/assets/img/github-icon.png"
import { TextField } from "@/shared/ui/text-field/text-field"
import { Button } from "@/shared/ui"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpInputs, signUpSchema } from "@/shared/lib/signUpSchema/signUpSchema"

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { userName: "", email: "", password: "", confirmPassword: "", agree: false },
  })

  const onSubmit = () => {
    reset()
  }

  const isInvalid = Object.keys(errors).length !== 0

  return (
    <div className={s.page}>
      <Form.Root className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h1
          style={{
            color: "var(--color-light-100)",
            textAlign: "center",
            fontSize: "var(--text-xl)",
            marginBottom: "13px",
          }}
        >
          Sign Up
        </h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "60px" }}>
          <a href={""} className={s.icon}>
            <Image src={googleIcon} alt={"google-icon"} />
          </a>
          <a href={""} className={s.icon}>
            <Image src={gitHubIcon} alt={"github-icon"} />
          </a>
        </div>
        <TextField label={"Username"} type={"text"} errorMessage={errors.userName?.message} {...register("userName")} />
        <TextField label={"Email"} type={"text"} errorMessage={errors.email?.message} {...register("email")} />
        <TextField
          label={"Password"}
          type={"password"}
          errorMessage={errors.password?.message}
          {...register("password")}
        />
        <TextField
          label={"Password confirmation"}
          errorMessage={errors.confirmPassword?.message}
          type={"password"}
          {...register("confirmPassword")}
        />
        <Form.Field className={s.field} name="agree" style={{ flexDirection: "row" }}>
          <Form.Control asChild>
            <input type="checkbox" {...register("agree")} />
          </Form.Control>
          <Form.Label className={s.label} style={{ paddingLeft: "8px", fontSize: "var(--text-xs)" }}>
            I agree to the <a href={"/auth/signup/TermsofService"}>Terms of Service</a> and{" "}
            <a href={"/auth/signup/PrivacyPolicy"}>Privacy Policy</a>
          </Form.Label>
        </Form.Field>
        <Button variant={"primary"} fullWidth={true} disabled={isInvalid}>
          Sign Up
        </Button>
        <span style={{ color: "var(--color-light-100)" }}>Do you have an account?</span>
        <Button variant={"text"} as={"a"} href={""}>
          Sign In
        </Button>
      </Form.Root>
    </div>
  )
}
