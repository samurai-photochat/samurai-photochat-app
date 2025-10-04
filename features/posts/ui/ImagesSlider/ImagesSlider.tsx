import { CanvasImage } from "@/features/posts/ui/StepsCreatePost/CroppingStep/CroppingStep"
import s from "./ImagesSlider.module.css"
import { ArrowBackOutline } from "@/shared/assets/icons/components/ArrowBackOutline"
import { ArrowForwardOutline } from "@/shared/assets/icons/components/ArrowForwardOutline"
import Image from "next/image"

type Props = {
  images: CanvasImage[]
  position: number
  setPosition: (position: number) => void
}

export const ImagesSlider = ({ images, position, setPosition }: Props) => {
  const currentImage = images[position]
  const { src, zoom, scale, filter } = currentImage
  if (position === images.length) setPosition(position - 1)

  const isWidthMoreThanHeight = 492 * scale >= 503

  return (
    <div className={s.container}>
      {position > 0 && (
        <button
          className={s.arrow}
          style={{ left: "12px" }}
          onClick={() => {
            setPosition(position - 1)
          }}
        >
          <ArrowBackOutline />
        </button>
      )}
      {position < images.length - 1 && (
        <button
          className={s.arrow}
          style={{ right: "12px" }}
          onClick={() => {
            setPosition(position + 1)
          }}
        >
          <ArrowForwardOutline />
        </button>
      )}
      <div
        className={s.imageWrapper}
        style={{
          width: (isWidthMoreThanHeight ? 492 : 504 * scale) + "px",
        }}
      >
        <Image
          src={src}
          alt={``}
          layout="responsive"
          width={0}
          height={0}
          style={{
            aspectRatio: scale,
            filter: filter,
            scale: zoom,
          }}
          className={s.image}
        />
      </div>
    </div>
  )
}
