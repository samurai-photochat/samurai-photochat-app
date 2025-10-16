"use client"

import { useState } from "react"
import { useGetAllPostsQuery } from "@/features/posts/api/postsApi"
import Image from "next/image"
import styles from "./MainPhotos.module.scss"
import { PostModal } from "@/features/posts/ui/PostModal"

// Функция для форматирования времени "X минут назад"
const getTimeAgo = (date: string): string => {
  const now = new Date()
  const postDate = new Date(date)
  const diffInMs = now.getTime() - postDate.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 1) return "только что"
  if (diffInMinutes < 60) return `${diffInMinutes} мин назад`
  if (diffInHours < 24) return `${diffInHours} ч назад`
  if (diffInDays < 7) return `${diffInDays} дн назад`

  return postDate.toLocaleDateString("ru-RU", { day: "numeric", month: "short" })
}

export const MainPhotos = () => {
  const { data: postsData, isLoading: isPostsLoading, error: postsError } = useGetAllPostsQuery({ pageSize: 5 })
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

  if (isPostsLoading) {
    return <p>Загрузка постов...</p>
  }

  if (postsError) {
    return <p>Ошибка при загрузке постов</p>
  }

  if (!postsData?.items || postsData.items.length === 0) {
    return <p>Постов пока нет</p>
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.grid}>
          {postsData.items.slice(0, 5).map((post) => (
            <div key={post.id} className={styles.card} onClick={() => handleOpenPost(post.id)}>
              {/* Фото поста */}
              {post.images && post.images.length > 0 && (
                <div className={styles.imageWrapper}>
                  <Image
                    src={post.images[0].url}
                    alt={post.description || "Post image"}
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 992px) 33vw, (max-width: 1200px) 25vw, 20vw"
                    style={{ objectFit: "cover" }}
                    quality={85}
                  />
                </div>
              )}

              {/* Аватар и имя пользователя */}
              <div className={styles.userInfo}>
                {post.avatarOwner && (
                  <div className={styles.avatar}>
                    <Image
                      src={post.avatarOwner}
                      alt={post.userName}
                      fill
                      sizes="32px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <span>{post.userName}</span>
              </div>

              {/* Время публикации */}
              <div className={styles.timeAgo}>{getTimeAgo(post.createdAt)}</div>

              {/* Описание */}
              {post.description && <p className={styles.description}>{post.description}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно с постом */}
      <PostModal isOpen={isModalOpen} postId={selectedPostId} onClose={handleCloseModal} />
    </>
  )
}
