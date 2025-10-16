import { Post } from "@/features/posts/api/postsApi.types"

import { PostContentHeader } from "./PostContentHeader"
import { PostFooter } from "./PostFooter"

import s from "../ui/PostModal.module.scss"

type PostContentProps = {
  post: Post
  isOwnPost: boolean
}

export const PostContent = ({ post, isOwnPost }: PostContentProps) => {
  return (
    <div className={s.mainContentWrapper}>
      <PostContentHeader post={post} isOwnPost={isOwnPost} />
      <hr style={{ borderColor: "var(--color-dark-100)", width: "100%" }} />
      <div className={s.scrollArea}>
        <p>{post.description || "Без описания"}</p>
        <div className={s.commentsPlaceholder}>
          <p>коментарии в разработке</p>
        </div>
      </div>
      <PostFooter post={post} />
    </div>
  )
}
