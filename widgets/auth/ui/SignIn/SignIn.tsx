"use client"
import { LoginType, useLoginMutation } from "@/features/auth/api/authApi"

import { useRouter } from "next/navigation"
import LocalStorage from "@/shared/utils/localStorage/localStorage"
import SignInForm from "@/features/auth/ui/SignIn/SignInForm"

export function SignIn() {
  const [loginUser] = useLoginMutation()
  const router = useRouter()
  const submitAction = async (loginData: LoginType, reset: () => void) => {
    const { data } = await loginUser(loginData)
    if (data) {
      LocalStorage.setToken(data.accessToken)
      router.push("/")
    }
    reset()
  }
  return <SignInForm submitAction={submitAction} />
}
