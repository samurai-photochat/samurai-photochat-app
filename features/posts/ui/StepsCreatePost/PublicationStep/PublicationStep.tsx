import { useAppSelector } from "@/app/hooks/useAppSelector"
import { useState } from "react"
import { selectImages } from "@/features/posts/model/postsSlice"
import { ImagesSlider } from "@/shared/ui/ImagesSlider/ImagesSlider"
import s from "./PublicationStep.module.scss"
import NextImage from "next/image"
import Pin from "@/shared/assets/svg/pin.svg"
import { Textarea } from "@/shared/ui/textarea/textarea"

type Props = {
  description: string
  setDescription: (description: string) => void
}

export const PublicationStep = ({ description, setDescription }: Props) => {
  const images = useAppSelector(selectImages)
  const [position, setPosition] = useState(0)
  return (
    <div className={s.content} style={{ position: "relative" }}>
      <ImagesSlider images={images} startPosition={position} action={setPosition} />
      <div className={s.PublicationBlock}>
        <div className={s.topContentWrap}>
          <div className={s.headerBlock}>
            <div className={s.userFhoto}>{/* фото User */}</div>
            <h3 className={s.userURL}>URLUser</h3>
          </div>
          <div className={s.textareaBlock}>
            <label htmlFor="message" className={s.label}>
              Add publication descriptions
            </label>
            <Textarea max={500} text={description} setText={setDescription} />
          </div>
        </div>
        <div className={s.bottomContentWrap}>
          <div className={s.inputLocationWrap}>
            <label className={s.label}>Add location</label>
            {/*<input className={s.locationInput} value={"New York"} />*/}
            <span className={s.span}>
              <NextImage src={Pin} alt="x" />
            </span>
          </div>
          <div className={s.locationWrap}>
            <label className={s.mainLocation}>New York</label>
            <label className={s.subLocation}>Washington Square Park</label>
          </div>
          <div className={s.locationWrap}>
            <label className={s.mainLocation}>New York</label>
            <label className={s.subLocation}>Washington Square Park</label>
          </div>
        </div>
      </div>
    </div>
  )
}
