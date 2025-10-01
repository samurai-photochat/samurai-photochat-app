import { ChangeEvent, useState } from "react"
import s from "./textarea.module.scss"

type Props = {
  max: number
  started: string
}
export const Textarea = ({ max, started }: Props) => {
  const [text, setText] = useState(started)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.currentTarget.value
    if (next.length <= max) {
      setText(next)
    } else {
      //   дописать
    }
  }
  return (
    <div className={s.content}>
      <textarea
        value={text}
        placeholder={started}
        onChange={handleChange}
        id="message"
        name="message"
        className={s.textarea}
      ></textarea>
      <div className={s.blockWords}>
        <label className={s.manyWords}>{`${text.length}/${max}`}</label>
      </div>
    </div>
  )
}
