"use client"
import { useRef, useState } from "react"
import s from "./CroppingStep.module.scss"
import { ResizingButton } from "@/features/posts/CroppingButton/ResizingButton/ResizingButton"
import { ZoomingButton } from "@/features/posts/CroppingButton/ZoomingButton/ZoomingButton"
import { LoadingButton } from "@/features/posts/CroppingButton/LoadingButton/LoadingButton"
import { useAppSelector } from "@/app/hooks/useAppSelector"
import { addImageAC, changeImageAC, deleteImageAC, selectImages } from "@/features/posts/model/postsSlice"
import { useAppDispatch } from "@/app/hooks/useAppDispatch"
import { setAppError } from "@/app/model/appSlice"
import { ImagesSlider } from "@/features/posts/ui/CanvasSlider/ImagesSlider"
import { CanvasEditor } from "@/features/posts/ui/CanvasEditor/CanvasEditor"

export type CanvasImage = {
  file: File
  imageSrc: string
  filter: string
  zoom: number
  scale: number
  preview: string
}

export const CroppingStep = () => {
  const images = useAppSelector(selectImages)
  const ref = useRef<HTMLHeadingElement | null>(null)

  const defaultScale = ref.current ? ref.current?.offsetWidth / ref.current?.offsetHeight : 1
  const [position, setPosition] = useState(0)
  const currentImage = images[position]

  const dispatch = useAppDispatch()

  const addImage = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e?.target?.files && e.target.files.length > 0) {
      if (images.length === 10) {
        dispatch(setAppError({ error: "You can only upload up to 10 photos" }))
      } else dispatch(addImageAC({ file: e.target.files[0] }))
      e.target.value = ""
    }
  }

  const changeImage = (index: number, image: Partial<CanvasImage>) => {
    dispatch(changeImageAC({ index, image }))
  }

  const setZoom = (zoom: number) => {
    changeImage(position, { zoom })
  }

  const setScale = (scale: number) => {
    changeImage(position, { scale })
  }

  const setPreview = (preview: string) => {
    changeImage(position, { preview })
  }

  const deleteImage = (index: number) => {
    dispatch(deleteImageAC({ index }))
  }
  return (
    <div ref={ref} className={s.content}>
      {images.length > 0 && (
        <>
          <ImagesSlider images={images} position={position} setPosition={setPosition}>
            <CanvasEditor image={currentImage} className={s.canvas} setPreview={setPreview} />
          </ImagesSlider>
          <div className={s.buttonsContainer}>
            <ResizingButton setScale={setScale} defaultScale={defaultScale} />
            <ZoomingButton zoom={currentImage.zoom} setZoom={setZoom} />
            <LoadingButton images={images} deleteImage={deleteImage} addImage={addImage} />
          </div>
        </>
      )}
    </div>
  )
}
