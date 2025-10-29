import { ChangeEvent, HTMLProps } from "react"
import s from "./textarea.module.scss"

interface Props extends HTMLProps<HTMLTextAreaElement> {
  // max: number
  label?: string
  text?: string
  setText?: (text: string) => void
}
export const Textarea = ({ label, text, setText, onChange, maxLength, ...rest }: Props) => {
  // const [text, setText] = useState(started)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.currentTarget.value
    if (!maxLength || next.length <= maxLength) {
      setText?.(next)
    } else {
      onChange?.(e)
    }
  }
  return (
    <div className={s.content}>
      {label && (
        <label htmlFor="message" className={s.label}>
          {label}
        </label>
      )}
      <textarea
        value={text}
        // placeholder={started}
        onChange={handleChange}
        id="message"
        name="message"
        className={s.textarea}
        {...rest}
      ></textarea>
      <div className={s.blockWords}>
        {maxLength && <label className={s.manyWords}>{`${text?.length}/${maxLength}`}</label>}
      </div>
    </div>
  )
}
