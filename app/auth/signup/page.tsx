"use client"
import * as React from "react"
import { useConfirmationMutation, useRegistrationMutation, UserType } from "@/features/auth/api/authApi"
import { useAppDispatch } from "@/app/hooks/useAppDispatch"
import { setAppError } from "@/app/model/appSlice"
import { ApiErrorResultDto } from "@/features/auth/api/authApi.types"
import { useSearchParams } from "next/navigation"
import { Confirmation } from "@/widgets/auth/ui/Confirmation/Confirmation"
import s from "./page.module.css"
import { Registration } from "@/widgets/auth/ui/Registration/Registration"

function SignUpPage() {
  const [registerUser] = useRegistrationMutation()
  const [confirmation] = useConfirmationMutation()
  // Отображение Модальнного окна
  const [isModalClose, setIsModalClose] = React.useState<boolean>(true)
  // действительность ссылки на email
  const [islinkExpiration, setIslinkExpiration] = React.useState<boolean | null>(null)
  // user
  const [user, setUser] = React.useState<UserType | null>(null)
  const dispatch = useAppDispatch()
  // достаем query параметры
  const searchParams = useSearchParams()
  const code = searchParams.get("code")
  // запрос на потверждение
  React.useEffect(() => {
    if (code) {
      confirmation({ confirmationCode: code })
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
  }, [code])
  // колбек для передачи в кнопку
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
  // Закрытие модального окна
  const closeModal = () => setIsModalClose(true)
  return (
    <div className={s.page}>
      {/* В зависимости от наличия query отображаем тот или иной компонент */}
      {!code ? (
        <Registration isOpen={isModalClose} submitAction={submitAction} email={user?.email} isClose={closeModal} />
      ) : (
        // В зависимости от  действительности ссылки, будет отображаться нужная фича
        <Confirmation islinkExpiration={islinkExpiration} />
      )}
    </div>
  )
}

export default SignUpPage
