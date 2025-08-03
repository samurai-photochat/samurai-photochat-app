"use client"
import * as React from "react"
import { ModalWindow } from "@/features/auth/ui/Register/ModalWindow/ModalWindow"
import { RegisterForm } from "@/features/auth/ui/Register/RegisterForm/RegisterForm"
import { InfoForm } from "@/features/auth/ui/Register/InfoForm/InfoForm"
import EmailConfirmed from "@/shared/assets/svg/sign-up_bro.svg"
// import LinkExpired from "@/shared/assets/svg/rafiki.svg"
import s from "./Signup.module.css"
import { useConfirmationMutation, useRegistrationMutation, UserType } from "@/features/auth/api/authApi"
import { useAppDispatch } from "@/app/hooks/useAppDispatch"
import { setAppError } from "@/app/model/appSlice"
import { ApiErrorResultDto } from "@/features/auth/api/authApi.types"
import { useSearchParams } from "next/navigation"

export default function SignUp() {
  // забираем запрос
  const [registerUser] = useRegistrationMutation()
  const [confirmation] = useConfirmationMutation()
  // Отображение Модальнного окна
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(true)
  // user
  const [user, setUser] = React.useState<UserType | null>(null)
  const dispatch = useAppDispatch()
  // достаем query параметры
  const searchParams = useSearchParams()
  const code = searchParams.get("code")
  // запрос на потверждение
  React.useEffect(() => {
    if (code) {
      confirmation({ confirmationCode: code }).then((res) => {
        console.log(res)
      })
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
          setIsModalOpen(false)
          reset()
        }
      })
      .catch((err) => dispatch(setAppError({ error: err?.data?.messages[0]?.message })))
  }
  // Закрытие модального окна
  const closeModal = () => setIsModalOpen(true)

  return (
    <div className={s.page}>
      {/* В зависимости от наличия query отображаем тот или иной компонент */}
      {!code ? (
        <RegisterForm submitAction={submitAction} />
      ) : (
        <InfoForm
          title={"Congratulations!"}
          text={"Your email has been confirmed"}
          img={EmailConfirmed}
          textBtn={"Sing in"}
          isInput={false}
          href={"/auth/login"}
        />
      )}

      {/* Модальное окно "Email sent" */}
      <ModalWindow
        isOpen={isModalOpen}
        title={"Email sent"}
        text={`We have sent a link to confirm your email to ${user?.email}`}
        isClose={closeModal}
      />

      {/* Страница "Email verification link expired" */}
      {/* <InfoForm
        title={"Email verification link expired"}
        text={"Looks like the verification link has expired. Not to worry, we can send the link again"}
        img={LinkExpired}
        textBtn={"Resend verification link"}
        isInput={true}
      /> */}
    </div>
  )
}
