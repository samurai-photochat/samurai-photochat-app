import Image from "next/image"
import "./PostContent.css"
import { useGetPostByIdQuery } from "@/features/posts/api/postsApi"

type PostIdType = {
  postId: number
}

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

  return postDate.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
}

export function PostContent({ postId }: PostIdType) {
  const { data, isLoading, error } = useGetPostByIdQuery(postId)

  if (isLoading) {
    return (
      <div className="container">
        <p className="h3" style={{ padding: "20px", textAlign: "center" }}>
          Загрузка...
        </p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="container">
        <p className="h3" style={{ padding: "20px", textAlign: "center", color: "red" }}>
          Ошибка загрузки поста
        </p>
      </div>
    )
  }

  const formattedDate = getTimeAgo(data.createdAt)
  const fullDate = new Date(data.createdAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="container">
      <div className="photoPanel">
        {data.images && data.images.length > 0 && (
          <Image
            src={data.images[0].url}
            alt={data.description || "Post image"}
            width={data.images[0].width}
            height={data.images[0].height}
            style={{ width: "100%", height: "auto" }}
          />
        )}
      </div>
      <div className="right-panel">
        {/* Заголовок с аватаром и именем */}
        <div className="posts-header">
          {data.avatarOwner ? (
            <Image
              src={data.avatarOwner}
              alt={data.userName}
              className="post-avatar"
              width={32}
              height={32}
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <div className="post-avatar" style={{ width: "32px", height: "32px", background: "#ccc" }} />
          )}
          <p className="h3">{data.userName}</p>
        </div>

        {/* Описание поста */}
        <div className="posts-list regular-text-14">
          <div className="post">
            {data.avatarOwner && (
              <Image
                src={data.avatarOwner}
                alt={data.userName}
                className="post-avatar"
                width={32}
                height={32}
                style={{ borderRadius: "50%" }}
              />
            )}
            <div className="post-content">
              <p className="post-text">
                <span className="bold-text-14">{data.userName}</span> {data.description || "Без описания"}
              </p>
              <span className="post-time">{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Футер с лайками и датой */}
        <div className="posts-footer">
          <div className="posts-like">
            <p className="posts-counter h3">{data.likesCount.toLocaleString("ru-RU")} </p>
            <span className="regular-text-14" style={{ marginLeft: "4px" }}>
              {data.likesCount === 1 ? "лайк" : "лайков"}
            </span>
          </div>
          <p className="post-time">{fullDate}</p>
        </div>
      </div>
    </div>
  )
}
