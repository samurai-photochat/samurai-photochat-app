"use client"
import { useRef } from "react"
import s from "./SettingStep.module.scss"
import NextImage from "next/image"

export type CanvasImage = {
  file: File
  url: string
  filter: string
  zoom: number
  scale: number
  preview: string
} | null

type Props = {
  image: CanvasImage
}

export const SettingStap = ({ image }: Props) => {
  //   const images = useAppSelector(selectImages)
  const ref = useRef<HTMLHeadingElement | null>(null)

  if (image === null) {
    return <></>
  }

  return (
    <div ref={ref} className={s.content}>
      <div className={s.imageWrapper}>
        <div className={s.fon} />
        <NextImage
          src={image.url}
          alt={``}
          width={1000}
          height={1000}
          style={{
            width: "332px",
            height: "340px",
          }}
          className={s.image}
        />
      </div>
    </div>
  )
}
