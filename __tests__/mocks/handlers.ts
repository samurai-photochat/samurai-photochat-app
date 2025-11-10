import { http, HttpResponse } from "msw"
import { mockUsers, getTotalUsersCount } from "./data/users"
import { mockPosts, getLatestPosts } from "./data/posts"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api"

export const handlers = [
  // Получение общего количества пользователей
  http.get(`${API_BASE_URL}/public-user`, () => {
    return HttpResponse.json({ totalCount: getTotalUsersCount() })
  }),

  // Получение последних постов
  http.get(`${API_BASE_URL}/posts/all/`, ({ request }) => {
    const url = new URL(request.url)
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10")

    return HttpResponse.json({
      items: getLatestPosts(pageSize),
      pageSize,
      totalCount: mockPosts.length,
    })
  }),

  // Получение профиля пользователя
  http.get(`${API_BASE_URL}/public-user/profile/:userId`, ({ params }) => {
    const userId = parseInt(params.userId as string)
    const user = mockUsers.find((u) => u.id === userId)

    if (!user) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(user)
  }),
]
