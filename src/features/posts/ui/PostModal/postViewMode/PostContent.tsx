import { Post } from "@/features/posts/api/postsApi.types"

import { PostContentHeader } from "./PostContentHeader"
import { PostFooter } from "./PostFooter"

import s from "../PostModal.module.scss"
import React from "react"
import { useDeletePostMutation } from "@/features/posts/api/postsApi"
import { ModalWindow } from "@/shared/ui/ModalWindow"

type PostContentProps = {
  post: Post
  isOwnPost: boolean
  isAuth: boolean
  deleteMode: boolean
  setDeleteMode: (value: boolean) => void
  onClose: () => void
}

export const PostContent = ({ post, isOwnPost, isAuth, onClose, setDeleteMode, deleteMode }: PostContentProps) => {
  const [deletePost, { isLoading: isDeletePostLoading }] = useDeletePostMutation()

  const deletePostHandler = async () => {
    onClose()
    await deletePost({ postId: post.id, userId: post.ownerId })
  }

  return (
    <div className={s.mainContentWrapper}>
      <PostContentHeader post={post} isOwnPost={isOwnPost} isAuth={isAuth} />
      <hr style={{ borderColor: "var(--color-dark-100)", width: "100%" }} />
      <div className={s.scrollArea}>
        <p>{post.description || "Без описания"}</p>
        <div className={s.commentsPlaceholder}>
          <p>коментарии в разработке</p>
        </div>
      </div>
      <PostFooter post={post} />
      <ModalWindow
        title={"Delete Photo"}
        open={deleteMode}
        onClose={() => setDeleteMode(false)}
        description={<span>Are you sure you want to delete this post?</span>}
        buttonsContent={{
          buttons: [
            {
              title: "Yes",
              onClick: async () => {
                await deletePostHandler()
              },
              disabled: isDeletePostLoading,
            },
            { title: "No", onClick: () => setDeleteMode(false) },
          ],
          className: s.buttonBox,
        }}
      />
    </div>
  )
}
