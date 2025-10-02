import { useAppSelector } from "@/app/hooks/useAppSelector"
import { useState } from "react"
import { selectImages } from "@/features/posts/model/postsSlice"
// import { useAppDispatch } from "@/app/hooks/useAppDispatch"
import { ImagesSlider } from "@/features/posts/ui/CanvasSlider/ImagesSlider"
import { CanvasEditor } from "@/features/posts/ui/CanvasEditor/CanvasEditor"
import s from "./PublicationStep.module.scss"
import Image from "next/image"
import Pin from "@/shared/assets/svg/pin.svg"
import { Textarea } from "@/shared/ui/textarea/textarea"

export const PublicationStep = () => {
  const images = useAppSelector(selectImages)
  const [position, setPosition] = useState(0)
  const currentImage = images[position]

  // const dispatch = useAppDispatch()
  return (
    <div className={s.content}>
      <ImagesSlider images={images} position={position} setPosition={setPosition}>
        <CanvasEditor image={currentImage} />
      </ImagesSlider>
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
            <Textarea max={500} started="" />
          </div>
        </div>
        <div className={s.bottomContentWrap}>
          <div className={s.inputLocationWrap}>
            <label className={s.label}>Add location</label>
            <input className={s.locationInput} value={"New York"} />
            <span className={s.span}>
              <Image src={Pin} alt="x" />
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
