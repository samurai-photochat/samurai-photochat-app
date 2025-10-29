"use client"
import s from "./SelectBox.module.scss"
import { useRef, useState } from "react"
import arrowDown from "@/shared/assets/svg/arrowDown.svg"
import arrowUp from "@/shared/assets/svg/arrowUp.svg"
import { TextField, TextFieldProps } from "@/shared/ui/TextField"
import { useOutsideClick } from "@/shared/hooks/useOutsideClick"

type Props = {
  options: string[]
  onChange: (value: string) => void
} & Partial<TextFieldProps>

export const SelectBox = ({ label, options, value, onChange, className, ...rest }: Props) => {
  const [arrow, setArrow] = useState(arrowDown)
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const handleClick = () => {
    setArrow(arrow === arrowDown ? arrowUp : arrowDown)
    setIsOpen(!isOpen)
  }
  const handleBlur = () => {
    setArrow(arrowDown)
    setIsOpen(false)
  }

  useOutsideClick({ ref, action: handleBlur })

  return (
    <div className={s.box + (className ? " " + className : "")} ref={ref}>
      <TextField
        label={label}
        type={"text"}
        value={value}
        readOnly
        style={
          isOpen
            ? { outline: "transparent", cursor: "pointer", borderColor: "var(--color-light-100)" }
            : { cursor: "pointer", width: "100%" }
        }
        endIcon={
          <svg onClick={handleClick}>
            <use href={arrow.src} />
          </svg>
        }
        onClick={handleClick}
        className={s.select}
        {...rest}
      />
      {isOpen && (
        <ul className={s.options}>
          {options.map((value, index) => {
            const handleOptionClick = async () => {
              onChange(value)
              handleClick()
            }
            return (
              <li key={index} className={s.option} onClick={handleOptionClick}>
                {value}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
