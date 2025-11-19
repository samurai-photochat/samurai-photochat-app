"use client"

import { ReactNode } from "react"
import { useRouter, useSearchParams } from "next/navigation"

type MainPhotosClientProps = {
  children: ReactNode
}

/**
 * Клиентская обёртка для MainPhotos
 * Управляет навигацией при клике на пост
 */
export function MainPhotosClient({ children }: MainPhotosClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleOpenPost = (postId: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("postId", String(postId))
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <>
      <div
        onClick={(e) => {
          const target = e.target as HTMLElement
          const card = target.closest("[data-post-id]")
          if (card) {
            const postId = card.getAttribute("data-post-id")
            if (postId) {
              handleOpenPost(Number(postId))
            }
          }
        }}
        style={{
          width: "900px",
          maxWidth: "100%",
        }}
      >
        {children}
      </div>
    </>
  )
}
