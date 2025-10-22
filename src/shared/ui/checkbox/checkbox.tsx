import React, { useState } from "react"
import { Checkbox } from "radix-ui"
import Image from "next/image"
import s from "./checkbox.module.css"
import SelectedIcon from "@/shared/assets/svg/checkbox/Property 1=Default Selected.svg"
import UnSelectedIcon from "@/shared/assets/svg/checkbox/Property 1=Default Unselected.svg"
import DisabledSelectedIcon from "@/shared/assets/svg/checkbox/Property 1=Disabled Selected.svg"
import DisabledUnSelectedIcon from "@/shared/assets/svg/checkbox/Property 1=Disabled Unselected.svg"

type CheckboxProps = {
  id?: string
  checked?: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label?: string
}

// event: React.ChangeEvent<HTMLInputElement>
const CustomCheckbox = ({ checked, onChange, label, disabled }: CheckboxProps) => {
  // значение бокса
  const [isChecked, setIsChecked] = useState<boolean>(checked || false)
  // колбек для передачи значения бокса родителю
  const handleCheckboxChange = () => {
    const newChecked = !isChecked
    setIsChecked(newChecked)
    onChange(newChecked)
  }
  // нужный путь картинок в зависимости от значения disabled
  const SelectedIcons = disabled ? DisabledSelectedIcon : SelectedIcon
  const UnselectedIcons = disabled ? DisabledUnSelectedIcon : UnSelectedIcon

  return (
    <div className={s.container}>
      <Checkbox.Root
        className={s.checkbox}
        checked={isChecked}
        onCheckedChange={handleCheckboxChange}
        style={{ width: "24px", height: "24px" }}
        disabled={disabled}
      >
        {isChecked ? (
          <Image alt="icon" src={SelectedIcons} className={s.icon} />
        ) : (
          <Image alt="icon" src={UnselectedIcons} className={s.icon} />
        )}
      </Checkbox.Root>
      <span className={s.span}>{label}</span>
    </div>
  )
}

export default CustomCheckbox
