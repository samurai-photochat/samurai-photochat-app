import { Post } from "@/features/posts/api/postsApi.types"
import { Textarea } from "@/shared/ui/textarea/textarea"
import { Button } from "@/shared/ui"
import { useUpdatePostMutation } from "@/features/posts/api/postsApi"
import React, { useEffect, useState } from "react"
import { ModalWindow } from "@/features/auth/ui/Register/ModalWindow/ModalWindow"
import { usePostModalContext } from "@/features/posts/ui/PostModal/context/PostModalContext"
import s from "./PostEditModalContent.module.scss"
import { PostContentHeader } from "@/features/posts/ui/PostModal/postViewMode"

type Props = {
  post: Post
  openModal: boolean
  closeModal: () => void
}

export const PostEditModalContent = ({ post, openModal, closeModal }: Props) => {
  const [text, setText] = useState(post.description)
  const [updatePost, { isLoading: isUpdatePostLoading }] = useUpdatePostMutation()
  const { setEditMode, setTitle } = usePostModalContext()

  const changePostHandler = async () => {
    await updatePost({ postId: post.id, description: text })
    setEditMode(false)
  }

  useEffect(() => {
    setTitle("Edit Post")
  }, [setTitle])

  return (
    <div className={s.textAreaBlock}>
      <PostContentHeader post={post} isOwnPost={false} isAuth={false} />
      <label htmlFor="message" className={s.label}>
        Add publication descriptions
      </label>
      <Textarea max={500} text={text} setText={setText} />
      <Button variant={"primary"} className={s.editButton} onClick={changePostHandler} disabled={isUpdatePostLoading}>
        Save Changes
      </Button>
      <ModalWindow isOpen={openModal} title={"Close"} isClose={closeModal}>
        <p className={s.text}>
          Do you really want to close the edition of the publication?
          <br /> If you close changes won’t be saved
        </p>
        <div className={s.buttonBox}>
          <Button
            variant="outlined"
            className={s.modalButton}
            onClick={() => {
              setEditMode(false)
              setTitle("")
              closeModal()
            }}
          >
            Yes
          </Button>
          <Button
            className={s.modalButton}
            onClick={() => {
              closeModal()
            }}
          >
            No
          </Button>
        </div>
      </ModalWindow>
    </div>
  )
}
