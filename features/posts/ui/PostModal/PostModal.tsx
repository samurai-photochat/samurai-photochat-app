"use client"

import { Modal } from "./Modal/Modal"
import { PostContent } from "./Post/PostContent"

type PostModalProps = {
  isOpen: boolean
  postId: number | null
  onClose: () => void
}

/**
 * PostModal - компонент для отображения модального окна с постом
 *
 * Отвечает за:
 * - Рендеринг модального окна с контентом поста
 *
 * @param isOpen - состояние открытия модального окна
 * @param postId - ID поста для отображения
 * @param onClose - callback для закрытия модального окна
 */
export function PostModal({ isOpen, postId, onClose }: PostModalProps) {
  if (postId === null) {
    return null
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <PostContent postId={postId} />
    </Modal>
  )
}
