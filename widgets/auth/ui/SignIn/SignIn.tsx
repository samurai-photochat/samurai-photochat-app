"use client"
import { LoginType, useLoginMutation } from "@/features/auth/api/authApi"
import { setAppError } from "@/app/model/appSlice"
import { useAppDispatch } from "@/app/hooks/useAppDispatch"

import { useRouter } from "next/navigation"
import LocalStorage from "@/shared/utils/localStorage/localStorage"
import SignInForm from "@/features/auth/ui/SignIn/SignInForm"

export function SignIn() {
  const [loginUser, { isError }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const submitAction = (data: LoginType, reset: () => void) => {
    loginUser(data)
      .unwrap()
      .then((res: { accessToken: string }) => {
        if (res) {
          LocalStorage.setToken(res.accessToken)
          router.push("/")
        }

        if (isError) {
          throw new Error()
        }
        reset()
      })
      .catch((err) => {
        dispatch(setAppError(err?.data?.messages[0]?.message))
      })
  }
  return <SignInForm submitAction={submitAction} />
}
