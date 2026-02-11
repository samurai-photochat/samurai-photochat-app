import { ReactNode, useEffect, useRef } from "react"
import { useRadioGroup } from "./RadioGroup.context"
import s from "./RadioGroup.module.scss"

type Props = {
  value: string
  children: ReactNode
  disabled?: boolean
  className?: string
}
export const RadioButton = ({ value, children, disabled = false, className = "" }: Props) => {
  const { selectedValue, name, onChange, disabled: groupDisabled } = useRadioGroup()
  const isDisabled = disabled || groupDisabled
  const isSelected = selectedValue === value

  const handleChange = () => {
    if (!isDisabled) {
      onChange(value)
    }
  }

  return (
    <label className={s.radioButton + (isDisabled ? " " + s.disabled : "") + " " + className}>
      <input
        type={"radio"}
        name={name}
        value={value}
        checked={isSelected}
        onChange={handleChange}
        disabled={isDisabled}
        tabIndex={-1}
      />
      <span className={(isSelected ? s.selected + " " : "") + (isDisabled ? s.disabled + " " : "") + s.radioInput} />
      <span className={s.radioLabel}>{children}</span>
    </label>
  )
}
