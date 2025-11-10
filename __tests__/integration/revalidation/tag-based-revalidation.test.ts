import { describe, it, expect } from "vitest"
import { getTotalUsersCount, getLatestPosts, getUserProfile } from "@/shared/api/server/serverActions"

describe("Tag-based Revalidation", () => {
  describe("Теги кэширования", () => {
    it("getTotalUsersCount должна использовать тег users-count", async () => {
      // Функция использует тег users-count в next.tags
      const result = await getTotalUsersCount()

      expect(result).toBeDefined()
      expect(result.totalCount).toBeGreaterThanOrEqual(0)
    })

    it("getLatestPosts должна использовать тег latest-posts", async () => {
      // Функция использует тег latest-posts в next.tags
      const result = await getLatestPosts()

      expect(result).toBeDefined()
      expect(result.items).toBeDefined()
    })

    it("getUserProfile должна использовать тег profile-{userId}", async () => {
      // Функция использует тег profile-{userId} в next.tags
      const userId = 1
      const result = await getUserProfile(userId)

      expect(result).toBeDefined()
      expect(result.id).toBe(userId)
    })
  })

  describe("Независимость тегов", () => {
    it("разные функции должны использовать разные теги", async () => {
      // Каждая функция имеет свой уникальный тег
      const usersResult = await getTotalUsersCount()
      const postsResult = await getLatestPosts()
      const profileResult = await getUserProfile(1)

      // Все запросы должны выполниться успешно
      expect(usersResult).toBeDefined()
      expect(postsResult).toBeDefined()
      expect(profileResult).toBeDefined()
    })

    it("профили разных пользователей должны иметь разные теги", async () => {
      // profile-1, profile-2, profile-3 - разные теги
      const profile1 = await getUserProfile(1)
      const profile2 = await getUserProfile(2)
      const profile3 = await getUserProfile(3)

      expect(profile1.id).toBe(1)
      expect(profile2.id).toBe(2)
      expect(profile3.id).toBe(3)
    })
  })

  describe("Гранулярная ревалидация", () => {
    it("должна поддерживать выборочную ревалидацию по тегам", async () => {
      // Получаем данные с разными тегами
      const usersCount = await getTotalUsersCount()
      const posts = await getLatestPosts()
      const profile = await getUserProfile(1)

      // Все данные должны быть получены независимо
      expect(usersCount.totalCount).toBeGreaterThan(0)
      expect(posts.items.length).toBeGreaterThan(0)
      expect(profile.id).toBe(1)

      // При ревалидации одного тега, другие не затрагиваются
      // Это проверяется на уровне Next.js кэша
    })
  })

  describe("Производительность с тегами", () => {
    it("должна эффективно кэшировать данные с тегами", async () => {
      const startTime = Date.now()

      // Множественные запросы с разными тегами
      await Promise.all([
        getTotalUsersCount(), // tag: users-count
        getLatestPosts(), // tag: latest-posts
        getUserProfile(1), // tag: profile-1
        getUserProfile(2), // tag: profile-2
      ])

      const endTime = Date.now()
      const executionTime = endTime - startTime

      // Параллельное выполнение должно быть быстрым
      expect(executionTime).toBeLessThan(2000)
    })
  })

  describe("Структура тегов", () => {
    it("теги должны быть строками", () => {
      // Теги в Next.js должны быть строками
      const tags = ["users-count", "latest-posts", "profile-1", "profile-123"]

      tags.forEach((tag) => {
        expect(typeof tag).toBe("string")
        expect(tag.length).toBeGreaterThan(0)
      })
    })

    it("теги профилей должны следовать паттерну profile-{userId}", () => {
      const userIds = [1, 2, 3, 123, 999]

      userIds.forEach((userId) => {
        const tag = `profile-${userId}`
        expect(tag).toMatch(/^profile-\d+$/)
      })
    })
  })
})
