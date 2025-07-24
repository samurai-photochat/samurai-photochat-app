"use client"
import * as React from "react"
import { Form } from "radix-ui"
import Image from "next/image"
import s from "./RegisterForm.module.css"
import googleIcon from "@/shared/assets/img/google-icon.png"
import gitHubIcon from "@/shared/assets/img/github-icon.png"
import { TextField } from "@/shared/ui/text-field/text-field"
import { Button } from "@/shared/ui"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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
            I agree to the <a href={""}>Terms of Service</a> and <a href={""}>Privacy Policy</a>
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

const signUpSchema = z
  .object({
    userName: z
      .string()
      .min(1, "Username is required")
      .regex(/^[-_A-Za-z0-9]+$/, "Username must contain only numbers and latin letters")
      .min(6, "Minimum number of characters 6")
      .max(30, "Maximum number of characters 30"),
    email: z.email("The email is must match the format example@example.com"),
    password: z
      .string()
      .min(1, "Password is required")
      .regex(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])[-_A-Za-z0-9!"#$%&'()*+,./:;<=>?@[\]\\^{|}~]+$/,
        "Password must contain 0-9, a-z, A-Z, ! \" # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ { | } ~"
      )
      .min(6, "Minimum number of characters 6")
      .max(20, "Maximum number of characters 20"),
    confirmPassword: z.string(),
    agree: z.boolean().refine((data) => data === true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

export type SignUpInputs = z.infer<typeof signUpSchema>
