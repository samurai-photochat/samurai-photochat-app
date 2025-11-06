"use client"

import * as React from "react"
import { Suspense } from "react"
import { RegisterForm } from "@/features/auth/ui/Register/RegisterForm/RegisterForm"
import { useConfirmationMutation, useRegistrationMutation, UserType } from "@/features/auth/api/authApi"
import { useAppDispatch } from "@/shared/store/useAppDispatch"
import { useSearchParams } from "next/navigation"
import { Confirmation } from "@/widgets/auth/ui/Confirmation/Confirmation"
import { ModalWindow } from "@/shared/ui/ModalWindow"

function SignUpContentInner() {
  const [registerUser] = useRegistrationMutation()
  const [confirmation] = useConfirmationMutation()
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(true)
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
        setIsModalOpen(true)
        setIslinkExpiration(true)
        reset()
      }
    })
  }

  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      {!codeParams ? (
        <>
          <RegisterForm submitAction={submitAction} />
          <ModalWindow
            title={"Email sent"}
            open={isModalOpen}
            onClose={closeModal}
            description={<span>`We have sent a link to confirm your email to ${user?.email}`</span>}
            buttonsContent={{
              buttons: [{ title: "Yes", onClick: closeModal }],
            }}
          />
        </>
      ) : (
        // В зависимости от действительности ссылки, будет отображаться нужная фича
        <Confirmation islinkExpiration={islinkExpiration} />
      )}
    </>
  )
}

export function SignUpContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpContentInner />
    </Suspense>
  )
}
