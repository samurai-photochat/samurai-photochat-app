import * as React from "react"
// import { ModalWindow } from "@/features/auth/ui/Register/ModalWindow/ModalWindow"
import { RegisterForm } from "@/features/auth/ui/Register/RegisterForm/RegisterForm"
// import { InfoForm } from "@/features/auth/ui/Register/InfoForm/InfoForm"
// import EmailConfirmed from "@/shared/assets/svg/sign-up_bro.svg"
// import LinkExpired from "@/shared/assets/svg/rafiki.svg"
import s from "./Signup.module.css"
import { useRegistrationMutation, UserType } from "@/features/auth/api/authApi"
import { useAppDispatch } from "@/app/hooks/useAppDispatch"
import { setAppError } from "@/app/model/appSlice"

export default function SignUp() {
  // забираем запрос
  const [registerUser] = useRegistrationMutation()
  const dispatch = useAppDispatch()

  // user из компоненты RegisterForm
  // const user: UserType = {
  //   userName: "RomanIvanov96",
  //   email: "roma.ivanov96@mail.ru",
  //   password: "Ghjnjnbg123!",
  //   baseUrl: "http://localhost:3000",
  // }
  // колбек для передачи в кнопку
  const submitAction = (user: UserType, reset: () => void) => {
    registerUser(user)
      .then((res) => {
        if (res.error) {
          throw res.error
        }
        reset()
      })
      .catch((err) => dispatch(setAppError({ error: err?.data?.messages[0]?.message })))
  }

  // Отображение Модальнного окна
  // const [isModalOpen, setIsModalOpen] = React.useState(true)
  // Закрытие модального окна
  // const closeModal = () => setIsModalOpen(true)

  return (
    <div className={s.page}>
      {/* Форма регистрации */}
      <RegisterForm submitAction={submitAction} />
      {/* Модальное окно "Email sent" */}
      {/* <ModalWindow
        isOpen={isModalOpen}
        title={"Email sent"}
        text={"We have sent a link to confirm your email to epam@epam.com"}
        isClose={closeModal}
      /> */}
      {/* Страница "Congratulations!" */}
      {/* <InfoForm
        title={"Congratulations!"}
        text={"Your email has been confirmed"}
        img={EmailConfirmed}
        textBtn={"Sing in"}
        isInput={false}
      /> */}
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
