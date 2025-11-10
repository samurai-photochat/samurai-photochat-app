import { AllPostsResponse } from "@/features/posts/api/postsApi.types"
import { notFound } from "next/navigation"

type TotalCountResponse = {
  totalCount: number
}
export async function getTotalUsersCount(): Promise<TotalCountResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public-user`, {
    next: { revalidate: 60, tags: ["users-count"] },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch users count: ${res.status}`)
  }

  return res.json()
}

export async function getLatestPosts(): Promise<AllPostsResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/all/?pageSize=4`, {
    next: { revalidate: 60, tags: ["latest-posts"] },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`)
  }

  return res.json()
}

export async function getUserProfile(userId: number) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  const response = await fetch(`${baseUrl}/public-user/profile/${userId}`, {
    next: { revalidate: 60, tags: [`profile-${userId}`] },
  })
  if (response.status === 404) return notFound()
  if (!response.ok) throw new Error(`Failed to fetch profile: ${response.statusText}`)
  return await response.json()
}

export async function getPostById(postId: number) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  const response = await fetch(`${baseUrl}/posts/id/${postId}`, {
    next: { revalidate: 60, tags: [`post-${postId}`] },
  })
  if (response.status === 404) return notFound()
  if (!response.ok) throw new Error(`Failed to fetch post: ${response.statusText}`)
  return await response.json()
}
