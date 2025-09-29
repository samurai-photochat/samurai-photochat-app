"use client"
import { useState, useEffect, useRef, RefObject } from "react"

/**
 * Parameters for the usePhotoEditor hook.
 */
type Props = {
  /**
   * The image file to be edited.
   */
  file: File
  canvasRef?: RefObject<HTMLCanvasElement | null>

  setImageUrl?: (url: string) => void

  className?: string

  defaultWidth?: number

  defaultHeight?: number

  /**
   * Initial brightness level (default: 100).
   */
  defaultBrightness?: number

  /**
   * Initial contrast level (default: 100).
   */
  defaultContrast?: number

  /**
   * Initial saturation level (default: 100).
   */
  defaultSaturate?: number

  /**
   * Initial grayscale level (default: 0).
   */
  defaultGrayscale?: number

  /**
   * Initial zoom level (default: 1).
   */
  zoom?: number

  scale?: number
}

/**
 * Custom hook for handling photo editing within a canvas.
 *
 * @param {Props} params - Configuration parameters for the hook.
 * @returns {Object} - Returns state and functions for managing image editing.
 */
export const CanvasEditor = ({
  file,
  canvasRef = useRef<HTMLCanvasElement | null>(null),
  setImageUrl,
  className = "",
  defaultBrightness = 100,
  defaultContrast = 100,
  defaultSaturate = 100,
  defaultGrayscale = 0,
  zoom = 1,
  scale = 1,
}: Props) => {
  //canvasRef = useRef<HTMLCanvasElement | null>(canvasRef?.current || null)
  const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null)

  // State to hold the source of the image.
  const [imageSrc, setImageSrc] = useState<string>("")

  // State variables for various image transformations.
  const [brightness, setBrightness] = useState(defaultBrightness)
  const [contrast, setContrast] = useState(defaultContrast)
  const [saturate, setSaturate] = useState(defaultSaturate)
  const [grayscale, setGrayscale] = useState(defaultGrayscale)

  // Effect to update the image source when the file changes.
  useEffect(() => {
    setImgRef(new Image())
    if (setImageUrl && canvasRef.current) setImageUrl(canvasRef.current.toDataURL(file?.type))
  }, [])
  useEffect(() => {
    if (file) {
      const fileSrc = URL.createObjectURL(file)
      setImageSrc(fileSrc)
      if (setImageUrl && canvasRef.current) setImageUrl(canvasRef.current.toDataURL(file?.type))
      // resize()

      // Clean up the object URL when the component unmounts or file changes.
      return () => {
        URL.revokeObjectURL(fileSrc)
      }
      //console.log(imageSrc)
    }
  }, [file])

  // Effect to apply transformations and filters whenever relevant state changes.
  useEffect(() => {
    applyFilter()
  }, [file, imageSrc, zoom, scale, brightness, contrast, saturate, grayscale])

  /**
   * Applies the selected filters and transformations to the image on the canvas.
   */
  const applyFilter = () => {
    if (!imageSrc) return

    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")

    if (imgRef) {
      const imgElement = imgRef
      imgRef.src = imageSrc
      imgRef.onload = applyFilter

      imgElement.onload = () => {
        if (canvas && context) {
          const zoomedWidth = imgElement.width * zoom
          const zoomedHeight = imgElement.height * zoom
          const translateX = (imgElement.width - zoomedWidth) / 2
          const translateY = (imgElement.height - zoomedHeight) / 2

          resize()

          // Clear the canvas before drawing the updated image.
          context.clearRect(0, 0, imgElement.width, imgElement.height)

          // Apply filters and transformations.
          context.filter = getFilterString()
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
        }
      }
    }
  }
  const resize = () => {
    const canvas = canvasRef.current
    if (canvas && imgRef) {
      canvas.width = imgRef.width
      canvas.height = imgRef.height

      if (canvas.width / scale > canvas.height) {
        canvas.width = canvas.height * scale
      } else canvas.height = canvas.width / scale
    }
  }
  /**
   * Generates a file from the canvas content.
   * @returns {Promise<File | null>} A promise that resolves with the edited file or null if the canvas is not available.
   */
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

  const downloadImage = () => {
    const canvas = canvasRef.current
    if (canvas && file) {
      const link = document.createElement("a")
      link.download = file.name
      link.href = canvas.toDataURL(file?.type)
      link.click()
    }
  }

  /**
   * Generates a string representing the current filter settings.
   *
   * @returns {string} - A CSS filter string.
   */
  const getFilterString = (): string => {
    return `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) saturate(${saturate}%)`
  }

  /**
   * Resets the filters and styles to its original state with the default settings.
   */
  const resetFilters = () => {
    setBrightness(defaultBrightness)
    setContrast(defaultContrast)
    setSaturate(defaultSaturate)
    setGrayscale(defaultGrayscale)
    applyFilter()
  }

  // Expose the necessary state and handlers for external use.
  return <canvas ref={canvasRef} className={className}></canvas>
}
