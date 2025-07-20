import Image, { StaticImageData } from "next/image"
import s from "./InfoForm.module.scss"
import Button from "@/shared/ui/button/ui/button"

type Props = {
  title: string
  text: string
  textBtn: string
  img: StaticImageData
  isInput: boolean
}

export const InfoForm = ({ title, text, textBtn, isInput, img }: Props) => {
  return (
    <div className={s.form}>
      <h3 className={s.title}>{title}</h3>
      <p className={s.text}>{text}</p>
      {isInput && (
        // заменить на компоненту
        <form className={s.form}>
          <label className={s.label}>Email</label>
          <input className={s.input}></input>
        </form>
      )}
      <Button className={s.button}>{textBtn}</Button>
      <Image className={s.img} src={img} alt="x" />
    </div>
  )
}
