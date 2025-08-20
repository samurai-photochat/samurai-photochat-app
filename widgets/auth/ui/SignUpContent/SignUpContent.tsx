"use client"

import * as React from "react"
import { ModalWindow } from "@/features/auth/ui/Register/ModalWindow/ModalWindow"
import { RegisterForm } from "@/features/auth/ui/Register/RegisterForm/RegisterForm"
import { useConfirmationMutation, useRegistrationMutation, UserType } from "@/features/auth/api/authApi"
import { useAppDispatch } from "@/app/hooks/useAppDispatch"
import { setAppError } from "@/app/model/appSlice"
import { ApiErrorResultDto } from "@/features/auth/api/authApi.types"
import { useSearchParams } from "next/navigation"
import { Confirmation } from "@/widgets/auth/ui/Confirmation/Confirmation"
import s from "./signUpContent.module.css"

export function SignUpContent() {
  const [registerUser] = useRegistrationMutation()
  const [confirmation] = useConfirmationMutation()
  const [isModalClose, setIsModalClose] = React.useState<boolean>(true)
  // действительность ссылки на email
  const [islinkExpiration, setIslinkExpiration] = React.useState<boolean | null>(null)
  const [user, setUser] = React.useState<UserType | null>(null)
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const codeParams = searchParams.get("code")
  // запрос на потверждение
  React.useEffect(() => {
    if (codeParams) {
      confirmation({ confirmationCode: codeParams })
        .then((res) => {
          if (res.error) {
            if ("data" in res.error && res.error.data) {
              const errorData = res.error.data as ApiErrorResultDto
              dispatch(setAppError({ error: errorData.messages[0].message }))
              setIslinkExpiration(true)
            }
          } else {
            setIslinkExpiration(false)
          }
        })
        .catch((err) => dispatch(setAppError({ error: err?.data?.messages[0]?.message })))
    }
  }, [codeParams, confirmation, dispatch])

  const submitAction = (user: UserType, reset: () => void) => {
    setUser(user)
    registerUser(user)
      .then((res) => {
        // обработка ошибки и передача в стейт error
        if (res.error) {
          if ("data" in res.error && res.error.data) {
            const errorData = res.error.data as ApiErrorResultDto
            dispatch(setAppError({ error: errorData.messages[0].message }))
          }
        } else {
          setIsModalClose(false)
          setIslinkExpiration(true)
          reset()
        }
      })
      .catch((err) => dispatch(setAppError({ error: err?.data?.messages[0]?.message })))
  }

  const closeModal = () => setIsModalClose(true)

  return (
    <div className={s.page}>
      {!codeParams ? (
        <>
          <RegisterForm submitAction={submitAction} />
          <ModalWindow
            isOpen={isModalClose}
            title={"Email sent"}
            text={`We have sent a link to confirm your email to ${user?.email}`}
            isClose={closeModal}
          />
        </>
      ) : (
        // В зависимости от  действительности ссылки, будет отображаться нужная фича
        <Confirmation islinkExpiration={islinkExpiration} />
      )}
    </div>
  )
}
