"use client"
import * as React from "react"
import { ModalWindow } from "@/features/auth/ui/Register/ModalWindow/ModalWindow"
import { RegisterForm } from "@/features/auth/ui/Register/RegisterForm/RegisterForm"
import { InfoForm } from "@/features/auth/ui/Register/InfoForm/InfoForm"
import EmailConfirmed from "@/shared/assets/svg/sign-up_bro.svg"
import LinkExpired from "@/shared/assets/svg/rafiki.svg"
import s from "./page.module.css"

export default function RegistrationPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(true)

  const closeModal = () => setIsModalOpen(true)

  return (
    <div className={s.page}>
      {/* <ModalWindow
        isOpen={isModalOpen}
        title={"Email sent"}
        text={"We have sent a link to confirm your email to epam@epam.com"}
        isClose={closeModal}
      /> */}
      {/* <RegisterForm /> */}
      {/* <InfoForm
        title={"Congratulations!"}
        text={"Your email has been confirmed"}
        img={EmailConfirmed}
        textBtn={"Sing in"}
        isInput={false}
      /> */}
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
