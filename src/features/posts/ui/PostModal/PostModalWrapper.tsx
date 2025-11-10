"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { PostModal } from "./PostModal"
import { Post } from "../../api/postsApi.types"

type PostModalWrapperProps = {
  postId: number
  initialPost: Post | null
}

/**
 * Клиентский компонент-обертка для PostModal
 * Управляет навигацией и закрытием модального окна через URL
 */
export function PostModalWrapper({ postId, initialPost }: PostModalWrapperProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("postId")
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return <PostModal isOpen={true} postId={postId} onClose={handleClose} initialPost={initialPost} />
}
