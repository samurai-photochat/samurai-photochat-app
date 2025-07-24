import * as React from "react"
import { ModalWindow } from "@/features/auth/ui/Register/ModalWindow/ModalWindow"
import { RegisterForm } from "@/features/auth/ui/Register/RegisterForm/RegisterForm"
import { InfoForm } from "@/features/auth/ui/Register/InfoForm/InfoForm"
import EmailConfirmed from "@/shared/assets/svg/sign-up_bro.svg"
import LinkExpired from "@/shared/assets/svg/rafiki.svg"
import s from "./Signup.module.css"

export default function SignUp() {
  // Отображение Модальнного окна
  const [isModalOpen, setIsModalOpen] = React.useState(true)
  // Закрытие модального окна
  const closeModal = () => setIsModalOpen(true)

  return (
    <div className={s.page}>
      {/* Модальное окно "Email sent" */}
      <ModalWindow
        isOpen={isModalOpen}
        title={"Email sent"}
        text={"We have sent a link to confirm your email to epam@epam.com"}
        isClose={closeModal}
      />
      {/* Форма регистрации */}
      <RegisterForm />
      {/* Страница "Congratulations!" */}
      <InfoForm
        title={"Congratulations!"}
        text={"Your email has been confirmed"}
        img={EmailConfirmed}
        textBtn={"Sing in"}
        isInput={false}
      />
      {/* Страница "Email verification link expired" */}
      <InfoForm
        title={"Email verification link expired"}
        text={"Looks like the verification link has expired. Not to worry, we can send the link again"}
        img={LinkExpired}
        textBtn={"Resend verification link"}
        isInput={true}
      />
    </div>
  )
}
