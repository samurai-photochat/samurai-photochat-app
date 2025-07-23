import Image, { StaticImageData } from "next/image"
import s from "./InfoForm.module.css"
import Button from "@/shared/ui/button/button"
import { Form } from "radix-ui"
import Checkbox from "@/shared/ui/checkbox/checkbox"

type Props = {
  title: string
  text: string
  textBtn: string
  img: StaticImageData
  isInput: boolean
}

export const InfoForm = ({ title, text, textBtn, isInput, img }: Props) => {
  return (
    <div className={s.container}>
      <h3 className={s.title}>{title}</h3>
      <div className={s.text_container}>
        <p>{text}</p>
      </div>
      {isInput ? (
        <Form.Root className={s.form}>
          <Form.Field className={s.field} name="email">
            <Form.Label className={s.label}>Email</Form.Label>
            <Form.Control asChild>
              <input className={s.input} type="email" required />
            </Form.Control>
            <Form.Message className={s.message} match="valueMissing">
              The email address is required
            </Form.Message>
          </Form.Field>
          <Button>{textBtn}</Button>
        </Form.Root>
      ) : (
        <div className={s.container_button}>
          <Button>{textBtn}</Button>
        </div>
      )}
      <Image className={s.img} src={img} alt="x" />
    </div>
  )
}
