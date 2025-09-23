"use client"

import { GoogleOAuthSuccess } from "@/features/auth/ui/OAuth2"
import { Suspense } from "react"
import { Loader } from "@/shared/ui/loader"

export default function OauthLoginSuccessPage() {
  ;<Suspense fallback={<Loader fullScreen message="Processing authentication..." />}>
    <GoogleOAuthSuccess />
  </Suspense>
}
