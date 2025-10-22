import { AllPostsResponse } from "@/features/posts/api/postsApi.types"

type TotalCountResponse = {
  totalCount: number
}

/**
 * Получение общего количества зарегистрированных пользователей
 * Используется для серверного рендеринга на главной странице
 */
export async function getTotalUsersCount(): Promise<TotalCountResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public-user`, {
    next: { revalidate: 60, tags: ["users-count"] },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch users count: ${res.status}`)
  }

  return res.json()
}

/**
 * Получение последних 4 постов для главной страницы
 * Используется для серверного рендеринга с ISR
 */
export async function getLatestPosts(): Promise<AllPostsResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/all/?pageSize=4`, {
    next: { revalidate: 60, tags: ["latest-posts"] },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`)
  }

  return res.json()
}
