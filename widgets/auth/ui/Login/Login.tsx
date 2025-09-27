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

export default function Login() {
  const [loginUser, { isError, isLoading }] = useLoginMutation()
  const currentUser = useAppSelector((state) => state.auth.currentUser)
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


  if (currentUser) {
    router.push(PATH.ROOT)
  }

  return <LoginForm submitAction={submitAction} isLoading={isLoading} />
}
