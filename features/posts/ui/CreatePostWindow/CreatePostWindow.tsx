"use client"
import s from "./CreatePostWindow.module.css"
import { useState } from "react"
import { UploadingPhotoModal } from "@/features/posts/ui/CreatePostWindow/UploadingPhotoModal/UploadingPhotoModal"
import {
  CanvasImage,
  CroppingPhotoModal,
} from "@/features/posts/ui/CreatePostWindow/CroppingPhotoModal/CroppingPhotoModal"

export const CreatePostWindow = () => {
  const [files, setFiles] = useState<File[]>([])
  const [images, setImages] = useState<CanvasImage[]>([])

  const setFilesData = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e?.target?.files && e.target.files.length > 0) {
      setFiles([...files, e.target.files[0]])
      const image: CanvasImage = {
        file: e.target.files[0],
        imageUrl: "",
        brightness: 100,
        contrast: 100,
        saturate: 100,
        grayscale: 0,
        zoom: 1,
        scale: 490 / 504,
      }
      setImages([...images, image])
    }
  }

  const changeImage = (index: number, newImage: Partial<CanvasImage>) => {
    const newState = images.map((image, i) => (i === index ? { ...image, ...newImage } : image))
    setImages(newState)
  }

  return (
    <div className={s.window}>
      <h1 className={s.title}>Add Photo</h1>
      <div className={s.content}>
        {files.length > 0 ? (
          <CroppingPhotoModal files={files} setFilesData={setFilesData} images={images} changeImage={changeImage} />
        ) : (
          <UploadingPhotoModal setFilesData={setFilesData} />
        )}
      </div>
    </div>
  )
}
