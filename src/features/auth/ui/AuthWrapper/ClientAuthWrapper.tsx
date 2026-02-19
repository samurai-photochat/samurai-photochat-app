// src/features/auth/AccountManagement/AuthWrapper/ClientAuthWrapper.tsx (клиентский)
"use client"

import { useMeQuery } from "@/features/auth/api/authApi"
import Sidebar from "@/widgets/sidebar/sidebar"
import { ReactNode } from "react"
import { Header } from "@/widgets/header/header"
import { useTokenManagement } from "@/features/auth/ui/useTokenRefresh/useTokenRefresh"

export function ClientAuthWrapper({ children }: { children: ReactNode }) {
  const { data: user, isError } = useMeQuery()
  const isLoggedIn = !!user && !isError
  useTokenManagement()

  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        {isLoggedIn ? <Sidebar /> : null}
        {children}
      </div>
    </>
  )
}
