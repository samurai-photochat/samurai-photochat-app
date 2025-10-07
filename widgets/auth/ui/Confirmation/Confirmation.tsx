"use client"
import EmailConfirmed from "@/shared/assets/svg/sign-up_bro.svg"
import LinkExpired from "@/shared/assets/svg/rafiki.svg"
import { InfoForm } from "@/features/auth/ui/Register/InfoForm/InfoForm"
import { ResendingEmailRequest, useEmailResendingMutation } from "@/features/auth/api/authApi"
import { PATH } from "@/shared/config/routes"

type Props = {
  islinkExpiration: boolean | null
  value?: unknown
}
export const Confirmation = ({ islinkExpiration, value }: Props) => {
  // достаем запрос
  const [emailResending] = useEmailResendingMutation()
  // отработка запроса при нажатии на кнопку
  const buttonHandler = (prov: ResendingEmailRequest, reset: () => void) => {
    reset()
    emailResending(prov)
  }
  if (islinkExpiration === null) {
    return null
  }
  return (
    <>
      {islinkExpiration ? (
        <InfoForm
          title={"Email verification link expired"}
          text={"Looks like the verification link has expired. Not to worry, we can send the link again"}
          img={LinkExpired}
          textBtn={"Resend verification link"}
          isInput={true}
          handleClickAction={buttonHandler}
          value={value}
        />
      ) : (
        <InfoForm
          title={"Congratulations!"}
          text={"Your email has been confirmed"}
          img={EmailConfirmed}
          textBtn={"Sing in"}
          isInput={false}
          href={`${PATH.AUTH.LOGIN}`}
        />
      )}
    </>
  )
}
