import { describe, it, expect, vi } from "vitest"
import { GET } from "@/app/api/revalidate/route"
import { NextRequest } from "next/server"

// Мокируем функции Next.js
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}))

describe("On-Demand Revalidation", () => {
  const SECRET_TOKEN = process.env.REVALIDATION_SECRET_TOKEN || "test-secret-token"

  describe("Безопасность endpoint", () => {
    it("должна возвращать 401 без токена", async () => {
      const request = new NextRequest("http://localhost:3000/api/revalidate")

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.message).toBe("Invalid token")
    })

    it("должна возвращать 401 с неверным токеном", async () => {
      const request = new NextRequest("http://localhost:3000/api/revalidate?secret=wrong-token")

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.message).toBe("Invalid token")
    })

    it("должна возвращать 200 с верным токеном", async () => {
      const request = new NextRequest(`http://localhost:3000/api/revalidate?secret=${SECRET_TOKEN}`)

      const response = await GET(request)

      expect(response.status).toBe(200)
    })
  })

  describe("Ревалидация по пути", () => {
    it("должна ревалидировать путь по умолчанию (/)", async () => {
      const request = new NextRequest(`http://localhost:3000/api/revalidate?secret=${SECRET_TOKEN}`)

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.revalidated).toBe(true)
      expect(data.type).toBe("path")
      expect(data.path).toBe("/")
      expect(data.now).toBeDefined()
    })

    it("должна ревалидировать указанный путь", async () => {
      const testPath = "/profile/123"
      const request = new NextRequest(`http://localhost:3000/api/revalidate?secret=${SECRET_TOKEN}&path=${testPath}`)

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.revalidated).toBe(true)
      expect(data.type).toBe("path")
      expect(data.path).toBe(testPath)
    })
  })

  describe("Ревалидация по тегу", () => {
    it("должна ревалидировать по тегу users-count", async () => {
      const request = new NextRequest(`http://localhost:3000/api/revalidate?secret=${SECRET_TOKEN}&tag=users-count`)

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.revalidated).toBe(true)
      expect(data.type).toBe("tag")
      expect(data.tag).toBe("users-count")
      expect(data.now).toBeDefined()
    })

    it("должна ревалидировать по тегу latest-posts", async () => {
      const request = new NextRequest(`http://localhost:3000/api/revalidate?secret=${SECRET_TOKEN}&tag=latest-posts`)

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.revalidated).toBe(true)
      expect(data.type).toBe("tag")
      expect(data.tag).toBe("latest-posts")
    })

    it("должна ревалидировать по тегу профиля", async () => {
      const userId = 123
      const request = new NextRequest(
        `http://localhost:3000/api/revalidate?secret=${SECRET_TOKEN}&tag=profile-${userId}`
      )

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.revalidated).toBe(true)
      expect(data.type).toBe("tag")
      expect(data.tag).toBe(`profile-${userId}`)
    })
  })

  describe("Приоритет параметров", () => {
    it("должна использовать тег вместо пути, если указаны оба", async () => {
      const request = new NextRequest(
        `http://localhost:3000/api/revalidate?secret=${SECRET_TOKEN}&path=/test&tag=test-tag`
      )

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.type).toBe("tag")
      expect(data.tag).toBe("test-tag")
    })
  })

  describe("Формат ответа", () => {
    it("должна возвращать корректную структуру ответа для пути", async () => {
      const request = new NextRequest(`http://localhost:3000/api/revalidate?secret=${SECRET_TOKEN}`)

      const response = await GET(request)
      const data = await response.json()

      expect(data).toHaveProperty("revalidated")
      expect(data).toHaveProperty("type")
      expect(data).toHaveProperty("path")
      expect(data).toHaveProperty("now")
      expect(typeof data.now).toBe("number")
    })

    it("должна возвращать корректную структуру ответа для тега", async () => {
      const request = new NextRequest(`http://localhost:3000/api/revalidate?secret=${SECRET_TOKEN}&tag=test`)

      const response = await GET(request)
      const data = await response.json()

      expect(data).toHaveProperty("revalidated")
      expect(data).toHaveProperty("type")
      expect(data).toHaveProperty("tag")
      expect(data).toHaveProperty("now")
      expect(typeof data.now).toBe("number")
    })
  })
})
