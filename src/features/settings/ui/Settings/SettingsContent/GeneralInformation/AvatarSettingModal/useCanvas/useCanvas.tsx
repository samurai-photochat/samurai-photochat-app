import { useCallback, useEffect, useRef, useState, WheelEvent, PointerEvent } from "react"

type Props = {
  file: File
  imageUrl: string
}

export const useCanvas = ({ imageUrl, file }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(new Image())
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(null)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)

  const handleZoomIn = () => {
    setZoom((value) => Math.min(value + 0.1, 3))
  }

  const handleZoomOut = () => {
    setZoom((value) => Math.max(value - 0.1, 1))
  }

  const handleWheel = (event: WheelEvent<HTMLCanvasElement>) => {
    if (event.deltaY < 0) {
      handleZoomIn()
    } else {
      handleZoomOut()
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    setIsDragging(true)
    const initialX = event.clientX - offsetX
    const initialY = event.clientY - offsetY
    setPanStart({ x: initialX, y: initialY })
  }

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (isDragging && panStart) {
      event.preventDefault()

      const canvas = canvasRef.current
      const imageElement = imageRef.current

      if (canvas) {
        const aspectRatio = imageElement.width / imageElement.height
        const imageWidth = canvas.clientWidth * zoom * (aspectRatio > 1 ? aspectRatio : 1)
        const imageHeight = canvas.clientHeight * zoom * (aspectRatio < 1 ? aspectRatio : 1)
        const maxWidth = (canvas.clientWidth - imageWidth) / 2
        const maxHeight = (canvas.clientHeight - imageHeight) / 2
        const offsetXDelta = Math.min(Math.max(event.clientX - panStart.x, maxWidth), -maxWidth)
        const offsetYDelta = Math.min(Math.max(event.clientY - panStart.y, maxHeight), -maxHeight)
        setOffsetX(offsetXDelta)
        setOffsetY(offsetYDelta)
      }
    }
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  const generateEditedFile = (): Promise<File | null> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current
      if (!canvas || !file) {
        resolve(null)
        return
      }

      const fileExtension = (file.name.split(".").pop() || "").toLowerCase()
      let mimeType
      switch (fileExtension) {
        case "jpg":
        case "jpeg":
          mimeType = "image/jpeg"
          break
        case "png":
          mimeType = "image/png"
          break
        default:
          mimeType = "image/png"
      }

      canvas.toBlob((blob) => {
        if (blob) {
          const newFile = new File([blob], file.name, { type: blob.type })
          resolve(newFile)
        } else {
          resolve(null)
        }
      }, mimeType)
    })
  }

  const update = useCallback(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")

    const imgElement = imageRef.current
    imgElement.src = imageUrl

    imgElement.onload = () => {
      if (canvas && context) {
        const zoomedWidth = imgElement.width * zoom
        const zoomedHeight = imgElement.height * zoom
        const translateX = (imgElement.width - zoomedWidth) / 2
        const translateY = (imgElement.height - zoomedHeight) / 2

        canvas.width = imgElement.width
        canvas.height = imgElement.height

        const aspectRatio = canvas.clientWidth / canvas.clientHeight

        if (canvas.width / aspectRatio > canvas.height) {
          canvas.width = canvas.height * aspectRatio
        } else canvas.height = canvas.width / aspectRatio

        context.clearRect(0, 0, imgElement.width, imgElement.width)
        context.save()
        context.translate(translateX + offsetX, translateY + offsetY)
        context.scale(zoom, zoom)
        context.drawImage(
          imgElement,
          (canvas.width - imgElement.width) / 2,
          (canvas.height - imgElement.height) / 2,
          imgElement.width,
          imgElement.height
        )
        context.restore()
      }
    }
  }, [imageUrl, offsetX, offsetY, zoom])

  const download = () => {
    const canvas = canvasRef.current
    if (canvas && file) {
      const link = document.createElement("a")
      link.download = file.name
      link.href = canvas.toDataURL(file?.type)
      link.click()
    }
  }

  useEffect(() => update(), [update])

  useEffect(() => {
    const handleUpOutside = (event: MouseEvent) => {
      if (event.button === 0) {
        setIsDragging(false)
      }
    }
    document.addEventListener("mouseup", handleUpOutside)
    return () => {
      document.removeEventListener("mouseup", handleUpOutside)
    }
  }, [canvasRef])

  return { canvasRef, download, handlePointerDown, handlePointerMove, handlePointerUp, handleWheel, generateEditedFile }
}
