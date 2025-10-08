"use client"
import { useForgotPasswordMutation } from "@/features/auth/api/authApi"
import { ForgotPasswordForm } from "@/features/auth/ui/ForgotPassword/ForgotPasswordForm"
import { useState } from "react"

export const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation()
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const submitAction = async ({ email }: { email: string }, reset: () => void) => {
    try {
      await forgotPassword({ email, baseUrl: window.location.origin }).unwrap()
      setMessage("The recovery link has been sent to your email.")
      setError("")
      reset()
    } catch (err) {
      setError("User with this email doesn’t exist or validation failed.")
      setMessage("")
    }
  }

  return <ForgotPasswordForm submitAction={submitAction} message={message} error={error} />
}
