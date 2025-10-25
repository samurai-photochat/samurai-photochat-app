import { describe, it, expect } from "vitest"
import { getTotalUsersCount, getLatestPosts, getUserProfile } from "@/shared/api/server/serverActions"

describe("Server-Side Rendering", () => {
  describe("Серверный рендеринг компонентов", () => {
    it("должна выполнять Server Actions на сервере", async () => {
      // Server Actions выполняются на сервере и возвращают данные
      const totalCount = await getTotalUsersCount()

      expect(totalCount).toBeDefined()
      expect(typeof totalCount.totalCount).toBe("number")
    })

    it("должна получать данные до рендеринга компонента", async () => {
      // Имитируем получение данных как в app/page.tsx
      const [totalCountData, postsData] = await Promise.all([
        getTotalUsersCount().catch(() => Promise.resolve({ totalCount: 0 })),
        getLatestPosts().catch(() => Promise.resolve({ items: [], pageSize: 4, totalCount: 0 })),
      ])

      // Проверяем, что данные получены успешно
      expect(totalCountData.totalCount).toBeGreaterThan(0)
      expect(postsData.items.length).toBeGreaterThan(0)
    })
  })

  describe("Получение данных на сервере", () => {
    it("должна использовать Promise.all для параллельных запросов", async () => {
      const startTime = Date.now()

      // Параллельное выполнение как в реальном приложении
      const results = await Promise.all([getTotalUsersCount(), getLatestPosts(), getUserProfile(1)])

      const endTime = Date.now()
      const executionTime = endTime - startTime

      // Все запросы должны вернуть данные
      expect(results[0]).toBeDefined()
      expect(results[1]).toBeDefined()
      expect(results[2]).toBeDefined()

      // Параллельное выполнение быстрее последовательного
      expect(executionTime).toBeLessThan(2000)
    })

    it("должна обрабатывать ошибки gracefully", async () => {
      // Тестируем обработку ошибок как в app/page.tsx
      const [totalCountData, postsData] = await Promise.all([
        getTotalUsersCount().catch(() => ({ totalCount: 0 })),
        getLatestPosts().catch(() => ({ items: [], pageSize: 4, totalCount: 0 })),
      ])

      // Даже при ошибках должны быть fallback значения
      expect(totalCountData).toHaveProperty("totalCount")
      expect(postsData).toHaveProperty("items")
      expect(Array.isArray(postsData.items)).toBe(true)
    })
  })

  describe("Server Actions", () => {
    it("getTotalUsersCount должна возвращать корректные данные", async () => {
      const result = await getTotalUsersCount()

      expect(result).toHaveProperty("totalCount")
      expect(typeof result.totalCount).toBe("number")
      expect(result.totalCount).toBeGreaterThanOrEqual(0)
    })

    it("getLatestPosts должна возвращать корректные данные", async () => {
      const result = await getLatestPosts()

      expect(result).toHaveProperty("items")
      expect(result).toHaveProperty("pageSize")
      expect(result).toHaveProperty("totalCount")
      expect(Array.isArray(result.items)).toBe(true)
      expect(result.items.length).toBeLessThanOrEqual(result.pageSize)
    })

    it("getUserProfile должна возвращать корректные данные", async () => {
      const result = await getUserProfile(1)

      expect(result).toHaveProperty("id")
      expect(result).toHaveProperty("userName")
      expect(result).toHaveProperty("firstName")
      expect(result).toHaveProperty("lastName")
      expect(result.id).toBe(1)
    })
  })

  describe("Производительность SSR", () => {
    it("должна выполнять запросы быстро", async () => {
      const startTime = Date.now()

      await getTotalUsersCount()

      const endTime = Date.now()
      const executionTime = endTime - startTime

      // Запрос должен выполняться быстро (с MSW моками)
      expect(executionTime).toBeLessThan(500)
    })

    it("должна эффективно обрабатывать множественные запросы", async () => {
      const startTime = Date.now()

      // Имитируем загрузку данных для нескольких страниц
      await Promise.all([
        getTotalUsersCount(),
        getLatestPosts(),
        getUserProfile(1),
        getUserProfile(2),
        getUserProfile(3),
      ])

      const endTime = Date.now()
      const executionTime = endTime - startTime

      // Параллельное выполнение должно быть эффективным
      expect(executionTime).toBeLessThan(1500)
    })
  })
})
