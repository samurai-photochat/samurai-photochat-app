import { useEffect, useRef } from "react"
import { jwtDecode } from "jwt-decode"
import LocalStorage from "@/shared/utils/localStorage"
import { useRefreshTokenMutation } from "@/features/auth"
import { PATH } from "@/shared/config/routes"

export const useTokenManagement = () => {
  const accessToken = LocalStorage.getToken()
  const [refreshToken] = useRefreshTokenMutation()
  const refreshTimerRef = useRef<NodeJS.Timeout>(null)

  const refreshTokenAndSchedule = async () => {
    try {
      const result = await refreshToken().unwrap()
      LocalStorage.setToken(result.accessToken)
      return result.accessToken
    } catch (error) {
      console.error("Token refresh failed:", error)
      throw error
    }
  }

  useEffect(() => {
    if (!accessToken) {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
      }
      if (window.location.href !== window.origin + PATH.AUTH.LOGIN) window.location.href = PATH.AUTH.LOGIN
      return
    }

    try {
      const decoded = jwtDecode<{ exp: number }>(accessToken)
      const expiresInMs = decoded.exp * 1000 - Date.now()

      console.log(`Token expires in ${expiresInMs / 1000} seconds`)

      if (expiresInMs <= 0) {
        // Токен уже истек - обновляем немедленно
        refreshTokenAndSchedule()
        return
      }

      // Обновляем за 15 секунд до истечения (для 1-минутного токена)
      const refreshTime = Math.max(expiresInMs - 15000, 0)

      refreshTimerRef.current = setTimeout(refreshTokenAndSchedule, refreshTime)

      // Также слушаем видимость страницы (если вкладка была неактивна)
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          const currentDecoded = jwtDecode<{ exp: number }>(accessToken)
          const currentExpiresIn = currentDecoded.exp * 1000 - Date.now()

          if (currentExpiresIn < 30000) {
            // Меньше 30 секунд
            refreshTokenAndSchedule()
          }
        }
      }

      document.addEventListener("visibilitychange", handleVisibilityChange)

      return () => {
        if (refreshTimerRef.current) {
          clearTimeout(refreshTimerRef.current)
        }
        document.removeEventListener("visibilitychange", handleVisibilityChange)
      }
    } catch (error) {
      console.error("Token management error:", error)
    }
  }, [accessToken])

  return null
}
