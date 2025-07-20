import * as Checkbox from "@radix-ui/react-checkbox"
import { useState } from "react"

export type CheckboxProps = {
  checked: boolean
  disabled: boolean
  onChange: (checked: boolean) => void
}

export const Checkbox = ({ checked, disabled, onChange }: CheckboxProps) => {
  const [checked, setChecked] = useState(checked)

  return <Checkbox></Checkbox>
