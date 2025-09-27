"use client"

import React from "react"
import { useGoogleLogin } from "@react-oauth/google"
import { useGoogleOAuthMutation } from "@/features/auth/api/authApi"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/ui"
import { PATH } from "@/shared/config/routes"
import s from "./socialLinks.module.scss"
import { FcGoogle } from "react-icons/fc"

interface GoogleOAuthButtonProps {
  onSuccess?: () => void
  onError?: (error: any) => void
  isDisabled?: boolean
}

export const GoogleOAuthButton: React.FC<GoogleOAuthButtonProps> = ({ onSuccess, onError, isDisabled }) => {
  const [googleOAuth, { isLoading }] = useGoogleOAuthMutation()
  const router = useRouter()

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        await googleOAuth({
          code: codeResponse.code,
          redirectUrl: window.location.origin,
        }).unwrap()
        onSuccess?.()
        router.push(PATH.ROOT) // Перенаправляем на домашнюю страницу после успешной авторизации
      } catch (error) {
        console.error("Google OAuth error:", error)
        onError?.(error)
      }
    },
    onError: (error) => {
      console.error("Google login error:", error)
      onError?.(error)
    },
    flow: "auth-code", // Используем authorization code flow согласно ТЗ
  })

  return (
    <Button
      variant="icon"
      onClick={() => login()}
      className={`${s.iconBtn} ${isDisabled ? s.disabled : ""}`}
      aria-disabled={isDisabled}
    >
      <FcGoogle className={s.icon} />
    </Button>
  )
}
