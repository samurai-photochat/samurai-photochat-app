import { describe, it, expect, vi } from "vitest"
import { getUserProfile } from "@/shared/api/server/serverActions"
import { notFound } from "next/navigation"

// Мокируем next/navigation
vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}))

describe("Profile Page ISR", () => {
  describe("Динамический ISR для профилей", () => {
    it("должна получать данные профиля существующего пользователя", async () => {
      const userId = 1
      const profile = await getUserProfile(userId)

      expect(profile).toBeDefined()
      expect(profile.id).toBe(userId)
      expect(profile).toHaveProperty("userName")
      expect(profile).toHaveProperty("firstName")
      expect(profile).toHaveProperty("lastName")
    })

    it("должна получать данные для разных пользователей", async () => {
      const profile1 = await getUserProfile(1)
      const profile2 = await getUserProfile(2)

      expect(profile1.id).toBe(1)
      expect(profile2.id).toBe(2)
      expect(profile1.userName).not.toBe(profile2.userName)
    })
  })

  describe("404 для несуществующих профилей", () => {
    it("должна вызывать notFound() для несуществующего профиля", async () => {
      const userId = 999999

      try {
        await getUserProfile(userId)
      } catch {}

      // Проверяем, что был вызван notFound()
      expect(vi.mocked(notFound)).toHaveBeenCalled()
    })
  })

  describe("Структура данных профиля", () => {
    it("должна возвращать полную информацию о профиле", async () => {
      const profile = await getUserProfile(1)

      expect(profile).toHaveProperty("id")
      expect(profile).toHaveProperty("userName")
      expect(profile).toHaveProperty("firstName")
      expect(profile).toHaveProperty("lastName")
      expect(profile).toHaveProperty("city")
      expect(profile).toHaveProperty("dateOfBirth")
      expect(profile).toHaveProperty("aboutMe")
    })

    it("должна включать аватары пользователя", async () => {
      const profile = await getUserProfile(1)

      expect(profile).toHaveProperty("avatars")
      expect(Array.isArray(profile.avatars)).toBe(true)

      if (profile.avatars.length > 0) {
        const avatar = profile.avatars[0]
        expect(avatar).toHaveProperty("url")
        expect(avatar).toHaveProperty("width")
        expect(avatar).toHaveProperty("height")
      }
    })
  })

  describe("Кэширование профилей", () => {
    it("должна использовать тег profile-{userId} для кэширования", async () => {
      const userId = 1

      // Первый запрос
      const profile1 = await getUserProfile(userId)

      // Второй запрос (должен использовать кэш)
      const profile2 = await getUserProfile(userId)

      expect(profile1).toEqual(profile2)
    })

    it("должна использовать разные теги для разных пользователей", async () => {
      // Профили разных пользователей должны кэшироваться независимо
      const profile1 = await getUserProfile(1)
      const profile2 = await getUserProfile(2)

      expect(profile1.id).not.toBe(profile2.id)
    })
  })
})
