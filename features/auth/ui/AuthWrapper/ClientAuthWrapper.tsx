"use client"

import { useMeQuery } from "@/features/auth/api/authApi"
import Sidebar from "@/widgets/sidebar/sidebar"
import { ReactNode } from "react"

type ClientAuthWrapperProps = {
  children: ReactNode
}

/**
 * Клиентская обёртка для проверки авторизации пользователя
 * Показывает Sidebar только для авторизованных пользователей
 * Публичный контент (children) отображается для всех
 */
export function ClientAuthWrapper({ children }: ClientAuthWrapperProps) {
  const { data: user, isError, isLoading } = useMeQuery()

  // Показываем лоадер только для проверки авторизации
  // Публичный контент уже отрендерен на сервере
  if (isLoading) {
    return (
      <div style={{ padding: "20px", color: "var(--color-light-100)" }}>
        <div>Проверка авторизации...</div>
        {children}
      </div>
    )
  }

  const isLoggedIn = !!user && !isError

  return (
    <div style={{ display: "flex" }}>
      {isLoggedIn && <Sidebar />}
      <div style={{ padding: "20px", margin: "0 auto" }}>{children}</div>
    </div>
  )
}
