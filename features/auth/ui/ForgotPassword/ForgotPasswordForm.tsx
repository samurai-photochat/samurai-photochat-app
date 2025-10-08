"use client"
import * as React from "react"
import * as Form from "@radix-ui/react-form"
import s from "./ForgotPasswordForm.module.scss"
import { TextField } from "@/shared/ui/text-field/text-field"
import { Button } from "@/shared/ui"
import { PATH } from "@/shared/config/routes"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"

const schema = z.object({
  email: z.string().email("Invalid email address"),
})

type FormInputs = z.infer<typeof schema>

type ForgotPasswordFormProps = {
  submitAction: (data: { email: string }, reset: () => void) => void
  message?: string
  error?: string
}

export const ForgotPasswordForm = ({ submitAction, message, error }: ForgotPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  })

  const onSubmit = (data: FormInputs) => {
    submitAction(data, reset)
  }

  return (
    <div className={s.page}>
      <Form.Root className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={s.h1}>Forgot Password</h1>
        <TextField
          label="Email"
          errorMessage={errors.email?.message}
          placeholder="example@mail.com"
          {...register("email")}
        />
        <p className={s.instruction}>Enter your email address and we will send you further instructions</p>

        {message && <p className={s.success}>{message}</p>}
        {error && <p className={s.error}>{error}</p>}

        <Button type="submit" className={s.button} variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Link"}
        </Button>

        <Button as={Link} href={PATH.AUTH.LOGIN} variant="text" className={s.backButton}>
          Back to Sign In
        </Button>
      </Form.Root>
    </div>
  )
}
