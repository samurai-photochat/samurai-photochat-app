import { Post } from "@/features/posts/api/postsApi.types"

import { PostContentHeader } from "./PostContentHeader"
import { PostFooter } from "./PostFooter"

import s from "../ui/PostModal.module.scss"
import { Button } from "@/shared/ui"
import { ModalWindow } from "@/features/auth/ui/Register/ModalWindow/ModalWindow"
import React from "react"
import { useDeletePostMutation } from "@/features/posts/api/postsApi"
import { usePostModalContext } from "@/features/posts/ui/PostModal/context/PostModalContext"

type PostContentProps = {
  post: Post
  isOwnPost: boolean
  isAuth: boolean
}

export const PostContent = ({ post, isOwnPost, isAuth }: PostContentProps) => {
  const [deletePost, { isLoading: isDeletePostLoading }] = useDeletePostMutation()

  const { deleteMode, setDeleteMode, onClose } = usePostModalContext()

  const deletePostHandler = async () => {
    try {
      await deletePost({ postId: post.id, userId: post.ownerId }).unwrap()
      setDeleteMode(false)
      // Закрываем модальное окно после успешного удаления
      onClose()
    } catch (error) {
      // Ошибка будет обработана через RTK Query middleware и отправлена в toast
      console.error("Failed to delete post:", error)
    }
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
