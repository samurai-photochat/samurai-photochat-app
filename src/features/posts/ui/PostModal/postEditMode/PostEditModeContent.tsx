import { Post } from "@/features/posts/api/postsApi.types"
import { Textarea } from "@/shared/ui/textarea/textarea"
import { Button } from "@/shared/ui"
import { useUpdatePostMutation } from "@/features/posts/api/postsApi"
import React, { useEffect, useState } from "react"
import { usePostModalContext } from "@/features/posts/ui/PostModal/context/PostModalContext"
import s from "./PostEditModeContent.module.scss"
import { PostContentHeader } from "@/features/posts/ui/PostModal/postViewMode"
import { ModalWindow } from "@/shared/ui/ModalWindow"

type Props = {
  post: Post
  openModal: boolean
  closeModal: () => void
}

export const PostEditModeContent = ({ post, openModal, closeModal }: Props) => {
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
      <ModalWindow
        title={"Close"}
        open={openModal}
        onClose={closeModal}
        description={
          <span>
            Do you really want to close the edition of the publication?
            <br /> If you close changes won’t be saved
          </span>
        }
        buttonsContent={{
          buttons: [
            {
              title: "Yes",
              onClick: () => {
                setEditMode(false)
                setTitle("")
                closeModal()
              },
            },
            { title: "No", onClick: closeModal },
          ],
          className: s.buttonBox,
        }}
      />
    </div>
  )
}
