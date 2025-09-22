"use client"
import { useLoginMutation } from "@/features/auth/api/authApi"
import { LoginRequest } from "@/features/auth/api/authApi.types"
import { setAppError } from "@/app/model/appSlice"
import LoginForm from "@/features/auth/ui/Login/LoginForm"
import { useAppDispatch } from "@/shared/hooks/useAppDispatch"
import { useRouter } from "next/navigation"

export default function Login() {
  const [loginUser, { isError, isLoading }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const submitAction = (data: LoginRequest, reset: () => void) => {
    loginUser(data)
      .unwrap()
      .then((res: { accessToken: string }) => {
        if (res) {
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
  return <LoginForm submitAction={submitAction} isLoading={isLoading} />
}
