// src/features/auth/ui/AuthWrapper/ClientAuthWrapper.tsx (клиентский)
"use client"

import { useMeQuery } from "@/features/auth/api/authApi"
import Sidebar from "@/widgets/sidebar/sidebar"
import { ReactNode } from "react"

export function ClientAuthWrapper({ children }: { children: ReactNode }) {
  const { data: user, isError } = useMeQuery()
  const isLoggedIn = !!user && !isError

  return (
    <div style={{ display: "flex" }}>
      {isLoggedIn ? <Sidebar /> : null}
      <div style={{ flex: 1, padding: "20px" }}>{children}</div>
    </div>
  )
}
