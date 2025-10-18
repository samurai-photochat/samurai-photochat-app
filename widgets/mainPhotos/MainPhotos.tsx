import Image from "next/image"
import styles from "./MainPhotos.module.scss"
import { MainPhotosClient } from "./MainPhotosClient"
import { AllPostsResponse } from "@/features/posts/api/postsApi.types"

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

type MainPhotosProps = {
  initialPosts: AllPostsResponse
}

/**
 * Серверный компонент для отображения последних постов на главной странице
 * Данные получаются через ISR на сервере
 */
export const MainPhotos = ({ initialPosts }: MainPhotosProps) => {
  if (!initialPosts?.items || initialPosts.items.length === 0) {
    return <p>Постов пока нет</p>
  }

  return (
    <MainPhotosClient>
      <div className={styles.container}>
        <div className={styles.grid}>
          {initialPosts.items.slice(0, 4).map((post) => (
            <div key={post.id} className={styles.card} data-post-id={post.id}>
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
    </MainPhotosClient>
  )
}
