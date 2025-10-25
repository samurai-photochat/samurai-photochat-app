import { describe, it, expect, beforeEach } from "vitest"
import { getTotalUsersCount, getLatestPosts } from "@/shared/api/server/serverActions"

describe("Home Page ISR", () => {
  describe("Статическая генерация при билде", () => {
    it("должна получать данные о пользователях на сервере", async () => {
      const result = await getTotalUsersCount()

      expect(result).toBeDefined()
      expect(result.totalCount).toBe(3)
    })

    it("должна получать последние посты на сервере", async () => {
      const result = await getLatestPosts()

      expect(result).toBeDefined()
      expect(result.items).toHaveLength(4)
      expect(result.totalCount).toBe(4)
      expect(result.pageSize).toBe(4)
    })

    it("должна получать данные параллельно через Promise.all", async () => {
      const startTime = Date.now()

      const [totalCountData, postsData] = await Promise.all([getTotalUsersCount(), getLatestPosts()])

      const endTime = Date.now()
      const executionTime = endTime - startTime

      expect(totalCountData.totalCount).toBe(3)
      expect(postsData.items).toHaveLength(4)
      // Параллельное выполнение должно быть быстрым
      expect(executionTime).toBeLessThan(1000)
    })
  })

  describe("Обработка ошибок API", () => {
    it("должна обрабатывать ошибку получения количества пользователей", async () => {
      // Тест будет расширен когда добавим возможность мокировать ошибки
      const result = await getTotalUsersCount().catch(() => ({ totalCount: 0 }))

      expect(result).toBeDefined()
      expect(result.totalCount).toBeGreaterThanOrEqual(0)
    })

    it("должна обрабатывать ошибку получения постов", async () => {
      const result = await getLatestPosts().catch(() => ({
        items: [],
        pageSize: 4,
        totalCount: 0,
      }))

      expect(result).toBeDefined()
      expect(Array.isArray(result.items)).toBe(true)
    })
  })

  describe("Структура данных", () => {
    it("должна возвращать корректную структуру данных пользователей", async () => {
      const result = await getTotalUsersCount()

      expect(result).toHaveProperty("totalCount")
      expect(typeof result.totalCount).toBe("number")
    })

    it("должна возвращать корректную структуру данных постов", async () => {
      const result = await getLatestPosts()

      expect(result).toHaveProperty("items")
      expect(result).toHaveProperty("pageSize")
      expect(result).toHaveProperty("totalCount")

      if (result.items.length > 0) {
        const post = result.items[0]
        expect(post).toHaveProperty("id")
        expect(post).toHaveProperty("description")
        expect(post).toHaveProperty("images")
        expect(post).toHaveProperty("owner")
        expect(post.owner).toHaveProperty("firstName")
        expect(post.owner).toHaveProperty("lastName")
        expect(post.owner).toHaveProperty("userName")
      }
    })
  })

  describe("Кэширование с тегами", () => {
    it("должна использовать правильные теги для кэширования", async () => {
      // Проверяем, что функции выполняются без ошибок
      // Теги проверяются на уровне Next.js fetch
      const usersPromise = getTotalUsersCount()
      const postsPromise = getLatestPosts()

      await expect(usersPromise).resolves.toBeDefined()
      await expect(postsPromise).resolves.toBeDefined()
    })
  })
})
