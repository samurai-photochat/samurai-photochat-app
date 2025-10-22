import { Post } from "@/features/posts/api/postsApi.types"

import s from "../PostModal.module.scss"

type PostFooterProps = {
  post: Post
}

export const PostFooter = ({ post }: PostFooterProps) => {
  const createdAt = new Date(post.createdAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className={s.footerSection}>
      <div className={s.likesRow}>
        <span>Лайков: {post.likesCount}</span>
      </div>
      <span className={s.dateRow}>{createdAt}</span>
    </div>
  )
}
