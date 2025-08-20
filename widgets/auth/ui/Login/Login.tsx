"use client"
import { LoginType, useLoginMutation } from "@/features/auth/api/authApi"
import { setAppError } from "@/app/model/appSlice"
import LoginForm from "@/features/auth/ui/Login/LoginForm"
import { useAppDispatch } from "@/app/hooks/useAppDispatch"

import { useRouter } from "next/navigation"
import LocalStorage from "@/shared/utils/localStorage/localStorage"

export default function Login() {
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
  return <LoginForm submitAction={submitAction} />
}
