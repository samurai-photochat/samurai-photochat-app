"use client"

import { Provider } from "react-redux"
import { store } from "@/app/store/store"
import React from "react"
import { GoogleOAuthProvider } from "@react-oauth/google"

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>{children}</GoogleOAuthProvider>
    </Provider>
  )
}
