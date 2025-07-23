import React from "react"
import { Checkbox } from "radix-ui"
import { CheckIcon } from "@radix-ui/react-icons"
import { StaticImageData } from "next/image"

type CheckboxProps = {
  checked: boolean
  onCheckedChange: () => void
  label?: string
  Icon?: StaticImageData
}

const UniversalCheckbox = ({ checked, onCheckedChange, label }: CheckboxProps) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Checkbox.Root checked={checked} onCheckedChange={onCheckedChange} style={{ width: "24px", height: "24px" }}>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span style={{ marginLeft: "8px" }}>{label}</span>
    </div>
  )
}

export default UniversalCheckbox
