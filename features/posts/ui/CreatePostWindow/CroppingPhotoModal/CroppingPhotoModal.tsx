"use client"
import { useRef, useState } from "react"
import s from "./CroppingPhotoModal.module.css"
import { ResizingButton } from "@/features/posts/ui/CreatePostWindow/CroppingButton/ResizingButton/ResizingButton"
import { ZoomingButton } from "@/features/posts/ui/CreatePostWindow/CroppingButton/ZoomingButton/ZoomingButton"
import { LoadingButton } from "@/features/posts/ui/CreatePostWindow/CroppingButton/LoadingButton/LoadingButton"
import { CanvasEditor } from "@/features/posts/ui/CreatePostWindow/CanvasEditor/CanvasEditor"

type Props = {
  files: File[]
  images: CanvasImage[]
  setFilesData: (e: React.ChangeEvent<HTMLInputElement> | null) => void
  changeImage: (index: number, image: Partial<CanvasImage>) => void
}

export type CanvasImage = {
  file: File
  imageUrl: string
  brightness: number
  contrast: number
  saturate: number
  grayscale: number
  zoom: number
  scale: number
}

export const CroppingPhotoModal = ({ files, images, setFilesData, changeImage }: Props) => {
  const ref = useRef<HTMLHeadingElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const defaultScale = 490 / 504 // ref.current ? ref.current?.offsetWidth / ref.current?.offsetHeight : 1
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const [imageUrl, setImageUrl] = useState("")
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturate, setSaturate] = useState(100)
  const [grayscale, setGrayscale] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [scale, setScale] = useState(defaultScale)

  const saveCurrentImage = () => {
    const newImage = { imageUrl, brightness, contrast, saturate, grayscale, zoom, scale } as Partial<CanvasImage>
    changeImage(currentIndex, newImage)
  }

  const downloadAllImages = () => {
    images.forEach((_image, i) => {
      const canvas = canvasRef.current
      if (canvas && files[i]) {
        const link = document.createElement("a")
        link.download = files[i].name
        link.href = canvas.toDataURL(files[i]?.type)
        link.click()
      }
    })
  }
  const setFilters = (index: number) => {
    const image = images[index]
    setBrightness(image.brightness)
    setContrast(image.contrast)
    setSaturate(image.saturate)
    setGrayscale(image.grayscale)
    setZoom(image.zoom)
    setScale(image.scale)
  }
  const setCurrentImage = (index: number) => {
    if (index !== currentIndex) {
      saveCurrentImage()
      setFilters(index)
      setCurrentIndex(index)
    }
  }
  return (
    <div ref={ref} className={s.content}>
      <button style={{ position: "absolute" }} onClick={downloadAllImages}>
        +
      </button>
      {currentIndex > 0 && (
        <button
          style={{ position: "absolute", left: "0", top: "50%", width: "20px", zIndex: 100 }}
          onClick={() => {
            setCurrentImage(currentIndex - 1)
          }}
        >
          &#8592;
        </button>
      )}
      {currentIndex < images.length - 1 && (
        <button
          style={{ position: "absolute", right: "0", top: "50%", width: "20px", zIndex: 100 }}
          onClick={() => {
            setCurrentImage(currentIndex + 1)
          }}
        >
          &#8594;
        </button>
      )}
      {images.length > 0 && (
        <>
          <CanvasEditor
            canvasRef={canvasRef}
            file={images[currentIndex].file}
            scale={scale}
            className={s.canvas}
            zoom={zoom}
            setImageUrl={setImageUrl}
          />
          <div className={s.buttonsContainer}>
            <ResizingButton setScale={setScale} defaultScale={defaultScale} />
            <ZoomingButton zoom={zoom} setZoom={setZoom} />
            <LoadingButton files={files} setCurentImage={setCurrentImage} />
            <input
              style={{ position: "absolute", right: "-100px" }}
              accept={"image/png, image/jpeg, image/jpg"}
              type="file"
              multiple
              onChange={(e) => setFilesData(e)}
            />
          </div>
        </>
      )}
    </div>
  )
}
