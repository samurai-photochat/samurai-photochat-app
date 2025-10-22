"use client"
import { useRef, useState } from "react"
import s from "./CroppingStep.module.scss"
import { ResizingButton } from "@/features/posts/ui/CroppingButton/ResizingButton/ResizingButton"
import { ZoomingButton } from "@/features/posts/ui/CroppingButton/ZoomingButton/ZoomingButton"
import { LoadingButton } from "@/features/posts/ui/CroppingButton/LoadingButton/LoadingButton"
import { useAppSelector } from "@/shared/lib/redux/useAppSelector"
import { changeImageAC, deleteImageAC, selectImages } from "@/features/posts/model/postsSlice"
import { useAppDispatch } from "@/shared/lib/redux/useAppDispatch"
import { ImagesSlider } from "@/shared/ui/ImagesSlider/ImagesSlider"

export type CanvasImage = {
  file: File
  url: string
  filter: string
  zoom: number
  scale: number
  preview: string
}

type Props = {
  addImageAction: (e: React.ChangeEvent<HTMLInputElement> | null) => void
}

export const CroppingStep = ({ addImageAction }: Props) => {
  const images = useAppSelector(selectImages)
  const ref = useRef<HTMLHeadingElement | null>(null)

  const defaultScale = ref.current ? ref.current?.offsetWidth / ref.current?.offsetHeight : 1
  const [position, setPosition] = useState(0)
  const currentImage = images[position]

  const dispatch = useAppDispatch()

  const changeImage = (index: number, image: Partial<CanvasImage>) => {
    dispatch(changeImageAC({ index, image }))
  }

  const setZoom = (zoom: number) => {
    changeImage(position, { zoom })
  }

  const setScale = (scale: number) => {
    changeImage(position, { scale })
  }

  const deleteImage = (index: number) => {
    if (index === position && index === images.length - 1) {
      setPosition(index - 1)
    }
    dispatch(deleteImageAC({ index }))
  }
  return (
    <div ref={ref} className={s.content}>
      {images.length > 0 && (
        <>
          <ImagesSlider images={images} startPosition={position} action={setPosition} />
          <div className={s.buttonsContainer}>
            <ResizingButton setScale={setScale} defaultScale={defaultScale} />
            <ZoomingButton zoom={currentImage.zoom} setZoom={setZoom} />
            <LoadingButton images={images} deleteImageAction={deleteImage} addImageAction={addImageAction} />
          </div>
        </>
      )}
    </div>
  )
}
