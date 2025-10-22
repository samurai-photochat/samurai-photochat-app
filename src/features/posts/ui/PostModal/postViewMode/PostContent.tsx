import { Post } from "@/features/posts/api/postsApi.types"

import { PostContentHeader } from "./PostContentHeader"
import { PostFooter } from "./PostFooter"

import s from "../PostModal.module.scss"
import { Button } from "@/shared/ui"
import { ModalWindow } from "@/features/auth/ui/Register/ModalWindow/ModalWindow"
import React from "react"
import { useDeletePostMutation } from "@/features/posts/api/postsApi"

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
      <ModalWindow isOpen={deleteMode} title={"Close"} isClose={() => setDeleteMode(false)}>
        <p className={s.text}>Are you sure you want to delete this post?</p>
        <div className={s.buttonBox}>
          <Button
            variant="outlined"
            className={s.modalButton}
            onClick={async () => {
              await deletePostHandler()
            }}
            disabled={isDeletePostLoading}
          >
            Yes
          </Button>
          <Button
            className={s.modalButton}
            onClick={() => {
              setDeleteMode(false)
            }}
          >
            No
          </Button>
        </div>
      </ModalWindow>
    </div>
  )
}
