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
  className?: string
}

export const ImagesSlider = ({ images, startPosition = 0, action, className = "" }: Props) => {
  const currentImage = images[startPosition]
  const { url } = currentImage
  return (
    <div className={s.container + (className ? " " + className : "")}>
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
          width={1000}
          height={1000}
          style={
            "zoom" in currentImage
              ? {
                  aspectRatio: currentImage.scale,
                  filter: currentImage.filter,
                  scale: currentImage.zoom,
                  width: "100%",
                  maxWidth: "490px",
                  maxHeight: "504px",
                  height: "auto",
                }
              : {
                  width: "490px",
                  height: "564px",
                }
          }
          className={s.image}
        />
      </div>
      {images.length > 1 && (
        <div className={s.circlesContainer} onClick={() => {}}>
          {images.map((_image, i) => (
            <div key={i} className={s.circle + (startPosition === i ? " " + s.active : "")}></div>
          ))}
        </div>
      )}
    </div>
  )
}
