import { CanvasImage } from "@/features/posts/ui/StepsCreatePost/CroppingStep/CroppingStep"
import s from "./ImagesSlider.module.css"
import { ArrowBackOutline } from "@/shared/assets/icons/components/ArrowBackOutline"
import { ArrowForwardOutline } from "@/shared/assets/icons/components/ArrowForwardOutline"
import NextImage from "next/image"
import { Image } from "@/features/posts/api/postsApi.types"

type Props = {
  images: CanvasImage[] | Image[]
  startPosition?: number
  action: (index: number) => void
}

export const ImagesSlider = ({ images, startPosition = 0, action }: Props) => {
  const currentImage = images[startPosition]
  const { url } = currentImage
  return (
    <div className={s.container}>
      {startPosition > 0 && (
        <button
          className={s.arrow}
          style={{ left: "12px" }}
          onClick={() => {
            action(startPosition - 1)
          }}
        >
          <ArrowBackOutline />
        </button>
      )}
      {startPosition < images.length - 1 && (
        <button
          className={s.arrow}
          style={{ right: "12px" }}
          onClick={() => {
            action(startPosition + 1)
          }}
        >
          <ArrowForwardOutline />
        </button>
      )}
      <div className={s.imageWrapper}>
        <NextImage
          src={url}
          alt={``}
          layout="responsive"
          width={0}
          height={0}
          style={
            "zoom" in currentImage
              ? {
                  aspectRatio: currentImage.scale,
                  filter: currentImage.filter,
                  scale: currentImage.zoom,
                }
              : {}
          }
          className={s.image}
        />
      </div>
      {images.length > 1 && (
        <div className={s.circlesContainer}>
          {images.map((_image, i) => (
            <div key={i} className={s.circle + (startPosition === i ? " " + s.active : "")}></div>
          ))}
        </div>
      )}
    </div>
  )
}
