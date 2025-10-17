import { Loader } from "@/shared/ui/loader/Loader"

import { PostModalImageSlider } from "./PostModalImageSlider"
import { PostContent } from "../postViewMode/PostContent"
import { usePostModalContext } from "../context/PostModalContext"

import s from "./PostModal.module.scss"

export const PostModalBody = () => {
  const { post, isOwnPost, isLoading, isAuth } = usePostModalContext()

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
    <div className={s.container}>
      <PostModalImageSlider />
      <div className={s.mainContentWrapper}>
        <PostContent post={post} isOwnPost={isOwnPost} isAuth={isAuth} />
      </div>
    </div>
  )
}
