import { RegisterForm } from "@/features/auth/ui/Register/RegisterForm/RegisterForm"
import { ModalWindow } from "@/features/auth/ui/Register/ModalWindow/ModalWindow"
import * as React from "react"
import { UserType } from "@/features/auth/api/authApi"

type Props = {
  isOpen: boolean
  submitAction: (user: UserType, reset: () => void) => void
  email: string | undefined
  isClose: () => void
}

export const Registration = ({ isOpen, submitAction, email, isClose }: Props) => {
  return (
    <>
      <RegisterForm submitAction={submitAction} />
      <ModalWindow
        isOpen={isOpen}
        title={"Email sent"}
        text={`We have sent a link to confirm your email to ${email}`}
        isClose={isClose}
      />
    </>
  )
}
