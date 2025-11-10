import { getPostById } from "@/shared/api/server/serverActions"
import { PostModalWrapper } from "./PostModalWrapper"
import { Post } from "../../api/postsApi.types"

type PostModalServerProps = {
  postId: number | null
}

/**
 * Серверный компонент-обертка для PostModal
 * Загружает данные поста с использованием ISR (revalidate: 60)
 * Передает данные в клиентский PostModal как initialPost
 */
export async function PostModalServer({ postId }: PostModalServerProps) {
  if (!postId) {
    return null
  }

  let initialPost: Post | null = null

  try {
    initialPost = await getPostById(postId)
  } catch (error) {
    console.error("Failed to fetch post:", error)
    // Если не удалось загрузить пост на сервере, клиентский компонент попробует сам
  }

  return <PostModalWrapper postId={postId} initialPost={initialPost} />
}
