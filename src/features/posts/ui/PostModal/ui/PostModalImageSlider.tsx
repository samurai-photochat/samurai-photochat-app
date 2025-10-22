import { useState } from "react"

import { ImagesSlider } from "@/shared/ui/ImagesSlider/ImagesSlider"

import { usePostModalContext } from "../context/PostModalContext"

import s from "./PostModal.module.scss"

export const PostModalImageSlider = () => {
  const { post } = usePostModalContext()
  const [activeIndex, setActiveIndex] = useState(0)

  if (!post || !post.images?.length) {
    return <div className={s.imageWrapper} />
  }

  return (
    <div className={s.imageWrapper}>
      <ImagesSlider images={post.images} startPosition={activeIndex} action={setActiveIndex} />
    </div>
  )
}
