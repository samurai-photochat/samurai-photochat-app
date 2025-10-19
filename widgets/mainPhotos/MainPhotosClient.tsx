"use client"

import { useState, ReactNode } from "react"
import { PostModal } from "@/features/posts/ui/PostModal"

type MainPhotosClientProps = {
  children: ReactNode
}

/**
 * Клиентская обёртка для MainPhotos
 * Управляет состоянием модального окна и обработкой кликов
 */
export function MainPhotosClient({ children }: MainPhotosClientProps) {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenPost = (postId: number) => {
    setSelectedPostId(postId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPostId(null)
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

      {/* Модальное окно с постом */}
      <PostModal isOpen={isModalOpen} postId={selectedPostId} onClose={handleCloseModal} />
    </>
  )
}
