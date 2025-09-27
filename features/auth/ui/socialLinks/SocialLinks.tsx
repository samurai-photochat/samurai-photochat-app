"use client"

import { Button } from "@/shared/ui"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { useCallback } from "react"
import s from "./socialLinks.module.scss"
import { GoogleOAuthButton } from "./GoogleOAuthButton"
import { GitHubOAuthButton } from "./GitHubOAuthButton"

//todo: дописать логику для onStartLoading и isDisabled

type SocialLinksProps = {
  isDisabled?: boolean
  onStartLoading?: () => void
}

export const SocialLinks = ({ isDisabled }: SocialLinksProps) => {
  return (
    <div className={s.iconsContainer}>
      <GitHubOAuthButton isDisabled={isDisabled} />
      <GoogleOAuthButton isDisabled={isDisabled} />
    </div>
  )
}
