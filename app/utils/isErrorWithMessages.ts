import { BaseApiResponse } from "@/features/auth/api/authApi.types"

export function isErrorWithMessages(error: unknown): error is BaseApiResponse {
  return (
    typeof error === "object" && // Проверяем, что error – это объект
    error != null && // Убеждаемся, что это не null
    "messages" in error // Проверяем, что у объекта есть свойство 'messages'
  )
}
