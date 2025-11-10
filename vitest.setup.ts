import "@testing-library/jest-dom"
import { beforeAll, afterEach, afterAll } from "vitest"
import { server } from "./__tests__/mocks/server"

// Запускаем MSW сервер перед всеми тестами
beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" })
})

// Сбрасываем handlers после каждого теста для изоляции
afterEach(() => {
  server.resetHandlers()
})

// Закрываем сервер после всех тестов
afterAll(() => {
  server.close()
})

// Мокируем переменные окружения
process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:3000/api"
process.env.REVALIDATION_SECRET_TOKEN = "test-secret-token"
