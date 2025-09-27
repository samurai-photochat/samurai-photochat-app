"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/shared/hooks/useAppDispatch"
import { setToken, setCurrentUser } from "@/features/auth/model/authSlice"
import { authApi, useLazyMeQuery } from "@/features/auth/api/authApi"
import LocalStorage from "@/shared/utils/localStorage/localStorage"
import { PATH } from "@/shared/config/routes"

export const useGitHubCallback = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [triggerMeQuery] = useLazyMeQuery()
  const processedRef = useRef(false)

  useEffect(() => {
    // Избегаем повторной обработки
    if (processedRef.current) return

    // Получаем параметры из URL напрямую, чтобы избежать проблем с useSearchParams в SSG
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const accessToken = urlParams.get("accessToken")
      const email = urlParams.get("email")

      if (accessToken && email) {
        processedRef.current = true
        console.log("GitHub OAuth callback: processing tokens", {
          accessToken: accessToken.substring(0, 10) + "...",
          email,
        })

        // Сохраняем токен
        LocalStorage.setToken(accessToken)
        dispatch(setToken(accessToken))

        // Инвалидируем кеш для обновления состояния авторизации
        dispatch(authApi.util.invalidateTags(["User"]))

        // Выполняем me запрос для получения актуальных данных пользователя
        triggerMeQuery()
          .unwrap()
          .then((userData) => {
            console.log("GitHub OAuth: User data received", userData)
            dispatch(setCurrentUser(userData))

            // Очищаем URL от параметров и перенаправляем на главную
            router.replace(PATH.ROOT)
          })
          .catch((error) => {
            console.error("Failed to fetch user data after GitHub OAuth:", error)
            // Если не удалось получить данные пользователя, всё равно перенаправляем на главную
            // так как токен уже сохранён и пользователь авторизован
            router.replace(PATH.ROOT)
          })
      }
    }
  }, [dispatch, router, triggerMeQuery])
}
