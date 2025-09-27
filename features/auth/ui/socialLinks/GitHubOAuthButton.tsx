"use client"

import React from "react"
import { Button } from "@/shared/ui"
import s from "./socialLinks.module.scss"
import { FaGithub } from "react-icons/fa"

interface GitHubOAuthButtonProps {
  onError?: (error: unknown) => void
  isDisabled?: boolean
}

export const GitHubOAuthButton: React.FC<GitHubOAuthButtonProps> = ({ isDisabled, onError }) => {
  const handleGitHubLogin = () => {
    try {
      // Согласно документации, используем прямой редирект на сервер
      const redirectUrl = encodeURIComponent(window.location.origin)
      const githubAuthUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/github/login?redirect_url=${redirectUrl}`

      window.location.assign(githubAuthUrl)
    } catch (error) {
      console.error("GitHub OAuth error:", error)
      onError?.(error)
    }
  }

  return (
    <Button
      variant="icon"
      onClick={handleGitHubLogin}
      className={`${s.iconBtn} ${isDisabled ? s.disabled : ""}`}
      aria-disabled={isDisabled}
    >
      <FaGithub className={s.icon} />
    </Button>
  )
}
