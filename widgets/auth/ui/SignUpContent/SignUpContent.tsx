"use client"

import * as React from "react"
import { Suspense } from "react"
import { ModalWindow } from "@/features/auth/ui/Register/ModalWindow/ModalWindow"
import { RegisterForm } from "@/features/auth/ui/Register/RegisterForm/RegisterForm"
import { useConfirmationMutation, useRegistrationMutation, UserType } from "@/features/auth/api/authApi"
import { useAppDispatch } from "@/app/hooks/useAppDispatch"
import { useSearchParams } from "next/navigation"
import { Confirmation } from "@/widgets/auth/ui/Confirmation/Confirmation"
import Button from "@/shared/ui/button/button"
import s from "./signUpContent.module.scss"

function SignUpContentInner() {
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
      confirmation({ confirmationCode: codeParams }).then((res) => {
        if (!res.error) {
          setIslinkExpiration(false)
        }
      })
    }
  }, [codeParams, confirmation, dispatch])

  const submitAction = (user: UserType, reset: () => void) => {
    setUser(user)
    registerUser(user).then((res) => {
      // обработка ошибки и передача в стейт error
      if (!res.error) {
        setIsModalClose(false)
        setIslinkExpiration(true)
        reset()
      }
    })
  }

  const closeModal = () => setIsModalClose(true)

  return (
    <div className={s.SignUpContent}>
      {!codeParams ? (
        <>
          <RegisterForm submitAction={submitAction} />
          <ModalWindow isOpen={!isModalClose} title={"Email sent"} isClose={closeModal}>
            <p className={s.text}>{`We have sent a link to confirm your email to ${user?.email}`}</p>
            <Button className={s.button} onClick={closeModal}>
              ОК
            </Button>
          </ModalWindow>
        </>
      ) : (
        // В зависимости от  действительности ссылки, будет отображаться нужная фича
        <Confirmation islinkExpiration={islinkExpiration} />
      )}
    </div>
  )
}

export function SignUpContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpContentInner />
    </Suspense>
  )
}
