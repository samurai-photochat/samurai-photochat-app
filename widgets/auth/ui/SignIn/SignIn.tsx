"use client"
import { useLoginMutation, useMeQuery } from "@/features/auth/api/authApi"
import { LoginRequest } from "@/features/auth/api/authApi.types"
import { setAppError } from "@/app/model/appSlice"
import LoginForm from "@/features/auth/ui/Login/LoginForm"
import { useAppDispatch } from "@/shared/hooks/useAppDispatch"

import { useRouter } from "next/navigation"
import { Loader } from "@/shared/ui/loader"
import { useState } from "react"
import { PATH } from "@/shared/config/routes"
import { useAppSelector } from "@/shared/hooks/useAppSelector"

export function SignIn() {
  const [loginUser, { isError }] = useLoginMutation()
  const dispatch = useAppDispatch()


  const router = useRouter()

  const submitAction = (inputs: LoginRequest, reset: () => void) => {
    loginUser(inputs)
      .unwrap()
      .then((res) => {
        if (res) {
          router.push(PATH.ROOT)
        }

        reset()
      })
      .catch((err) => {
        dispatch(setAppError(err?.data?.messages[0]?.message))
      })
  }
  return <SignInForm submitAction={submitAction} />
}
