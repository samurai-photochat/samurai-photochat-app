"use client"
import { useEffect, useRef } from "react"
import { CanvasImage } from "@/features/posts/ui/StepsCreatePost/CroppingStep/CroppingStep"

type Props = {
  image: CanvasImage
  className?: string
  //setPreview?: (preview: string) => void
}

export const CanvasEditor = ({ image, className }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const { imageSrc, filter, zoom, scale } = image

  useEffect(() => {
    applyFilter()
  })

  const applyFilter = () => {
    if (!imageSrc) return

    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")

    const imageRef = new Image()

    if (imageRef) {
      const imgElement = imageRef
      imageRef.src = imageSrc
      imageRef.onload = applyFilter

      imgElement.onload = () => {
        if (canvas && context) {
          const zoomedWidth = imgElement.width * zoom
          const zoomedHeight = imgElement.height * zoom
          const translateX = (imgElement.width - zoomedWidth) / 2
          const translateY = (imgElement.height - zoomedHeight) / 2

          resize(imageRef.width, imageRef.height)

          // Clear the canvas before drawing the updated image.
          context.clearRect(0, 0, imgElement.width, imgElement.height)

          // Apply filters and transformations.
          context.filter = filter
          context.save()

          context.translate(translateX, translateY)
          context.scale(zoom, zoom)
          context.drawImage(
            imgElement,
            (canvas.width - imgElement.width) / 2,
            (canvas.height - imgElement.height) / 2,
            imgElement.width,
            imgElement.height
          )

          context.restore()

          context.filter = "none"

          // setPreview?.(canvas.toDataURL(file?.type))
        }
      }
    }
  }
  const resize = (width: number, height: number) => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = width
      canvas.height = height

      if (canvas.width / scale > canvas.height) {
        canvas.width = canvas.height * scale
      } else canvas.height = canvas.width / scale
    }
  }

  // const generateEditedFile = (): Promise<File | null> => {
  //   return new Promise((resolve) => {
  //     const canvas = canvasRef.current
  //     if (!canvas || !file) {
  //       resolve(null)
  //       return
  //     }
  //
  //     const fileExtension = (file.name.split(".").pop() || "").toLowerCase()
  //     let mimeType
  //     switch (fileExtension) {
  //       case "jpg":
  //       case "jpeg":
  //         mimeType = "image/jpeg"
  //         break
  //       case "png":
  //         mimeType = "image/png"
  //         break
  //       default:
  //         mimeType = "image/png"
  //     }
  //
  //     canvas.toBlob((blob) => {
  //       if (blob) {
  //         const newFile = new File([blob], file.name, { type: blob.type })
  //         resolve(newFile)
  //       } else {
  //         resolve(null)
  //       }
  //     }, mimeType)
  //   })
  // }
  //
  // const downloadImage = () => {
  //   const canvas = canvasRef.current
  //   if (canvas && file) {
  //     const link = document.createElement("a")
  //     link.download = file.name
  //     link.href = canvas.toDataURL(file?.type)
  //     link.click()
  //   }
  // }
  //
  // const resetFilters = () => {
  //   applyFilter()
  // }

  return <canvas ref={canvasRef} className={className}></canvas>
}
