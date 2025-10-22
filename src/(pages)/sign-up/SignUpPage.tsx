import { Suspense } from "react"
import { SignUpContent } from "@/widgets/auth/ui"

/**
 * Страница регистрации (FSD pages layer)
 * Композирует виджеты для страницы регистрации
 */
export const SignUpPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpContent />
    </Suspense>
  )
}
