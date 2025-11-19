"use client"
import { LoginType, useLoginMutation } from "@/features/auth/api/authApi"

import { useRouter } from "next/navigation"
import LocalStorage from "@/shared/utils/localStorage"
import SignInForm from "@/features/auth/ui/SignIn/SignInForm"
import { useState } from "react"

export function SignIn() {
  const [loginUser] = useLoginMutation()
  const router = useRouter()
  const [error, setError] = useState("")
  const submitAction = async (loginData: LoginType, reset: () => void) => {
    // const { data } = await loginUser(loginData)
    // if (data) {
    //   LocalStorage.setToken(data.accessToken)
    //   router.push("/")
    //   reset()
    // }
    loginUser(loginData)
      .then((res) => {
        if (res.error) {
          setError("The email or password are incorrect. Try again please")
        } else {
          LocalStorage.setToken(res.data.accessToken)
          router.push("/")
          reset()
        }
      })
      .catch((err) => {
        setError(err)
      })
  }
  return <SignInForm submitAction={submitAction} error={error} />
}
