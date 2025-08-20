"use client"
import EmailConfirmed from "@/shared/assets/svg/sign-up_bro.svg"
import LinkExpired from "@/shared/assets/svg/rafiki.svg"
import { InfoForm } from "@/features/auth/ui/Register/InfoForm/InfoForm"
import { ResendingEmailType, useEmailResendingMutation } from "@/features/auth/api/authApi"
import { useAppDispatch } from "@/app/hooks/useAppDispatch"
import { setAppError } from "@/app/model/appSlice"
import { ApiErrorResultDto } from "@/features/auth/api/authApi.types"

type Props = {
  islinkExpiration: boolean | null
  value?: unknown
}
export const Confirmation = ({ islinkExpiration, value }: Props) => {
  const dispatch = useAppDispatch()
  // достаем запрос
  const [emailResending] = useEmailResendingMutation()
  // отработка запроса при нажатии на кнопку
  const buttonHandler = (prov: ResendingEmailType, reset: () => void) => {
    reset()
    emailResending(prov)
      .then((res) => {
        if (res.error) {
          if ("data" in res.error && res.error.data) {
            const errorData = res.error.data as ApiErrorResultDto
            dispatch(setAppError({ error: errorData.messages[0].message }))
          }
        }
      })
      .catch((err) => dispatch(setAppError({ error: err?.data?.messages[0]?.message })))
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
          handleClick={buttonHandler}
          value={value}
        />
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
    </>
  )
}
