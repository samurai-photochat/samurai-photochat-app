"use client"
import { useLoginMutation } from "@/features/auth/api/authApi"
import { setAppError } from "@/app/model/appSlice"
import LoginForm from "@/features/auth/ui/Login/LoginForm"
import { useAppDispatch } from "@/app/hooks/useAppDispatch";

export default function Login() {
  const [loginUser] = useLoginMutation()
  const dispatch = useAppDispatch()
  const submitAction = ({ email, password }: { email: string; password: string }, reset: () => void) => {
    loginUser({ email, password })
      .then((res) => {
        if (res.error) {
          throw res.error
        }
        reset()
      })
      .catch((err) => {
        dispatch(setAppError(err?.data?.messages[0]?.message))
      })
  }
  return <LoginForm submitAction={submitAction} />
}
