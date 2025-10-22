import { Loader } from "@/shared/ui/loader/Loader"

import { PostModalImageSlider } from "./PostModalImageSlider"
import { PostContent } from "../postViewMode/PostContent"
import { usePostModalContext } from "../context/PostModalContext"

import s from "./PostModal.module.scss"
import { PostEditModeContent } from "@/features/posts/ui/PostModal/postEditMode/PostEditModeContent"
import { useEffect, useRef, useState } from "react"
import { useOutsideClick } from "@/shared/lib/hooks/useOutsideClick"

export const PostModalBody = () => {
  const {
    post,
    isOwnPost,
    isLoading,
    isAuth,
    editMode,
    title,
    setEditMode,
    setTitle,
    deleteMode,
    onClose,
    setDeleteMode,
  } = usePostModalContext()

  const ref = useRef<HTMLDivElement | null>(null)
  const [exitModal, setExitModal] = useState(false)
  // callback
  useOutsideClick({
    ref,
    action: () => {
      if (editMode) {
        setExitModal(true)
      }
    },
  })

  useEffect(() => {
    setEditMode(false)
    setTitle("")
  }, [setEditMode, setTitle])

  if (isLoading) {
    return (
      <div className={s.container}>
        <Loader />
      </div>
    )
  }

  if (!post) {
    return null
  }

  return (
    <>
      {title && <h1 className={s.title}>{title}</h1>}
      <div className={s.container} ref={ref}>
        <PostModalImageSlider />
        <div className={s.mainContentWrapper}>
          {editMode ? (
            <PostEditModeContent post={post} openModal={exitModal} closeModal={() => setExitModal(false)} />
          ) : (
            <PostContent
              post={post}
              isOwnPost={isOwnPost}
              isAuth={isAuth}
              deleteMode={deleteMode}
              setDeleteMode={setDeleteMode}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </>
  )
}
