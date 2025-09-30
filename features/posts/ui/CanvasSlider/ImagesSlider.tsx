import { CanvasImage } from "@/features/posts/ui/StepsCreatePost/CroppingStep/CroppingStep"
import { ReactNode } from "react"
import s from "./ImagesSlider.module.css"
import { ArrowBackOutline } from "@/shared/assets/icons/components/ArrowBackOutline"
import { ArrowForwardOutline } from "@/shared/assets/icons/components/ArrowForwardOutline"

type Props = {
  images: CanvasImage[]
  position: number
  setPosition: (position: number) => void
  children: ReactNode
}

export const ImagesSlider = ({ images, position, setPosition, children }: Props) => {
  if (position === images.length) setPosition(position - 1)
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
      <div className={s.imageWrapper}>{children}</div>
    </div>
  )
}
