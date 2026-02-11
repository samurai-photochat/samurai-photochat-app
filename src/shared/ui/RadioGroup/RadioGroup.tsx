"use client"
import { RadioGroupContext } from "./RadioGroup.context"
import { RadioGroupContextType, RadioOption } from "./RadioGroup.types"
import { useEffect, useState } from "react"
import { RadioButton } from "@/shared/ui/RadioGroup/RadioButton"
import s from "./RadioGroup.module.scss"

type Props = {
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  name: string
  label?: string
  orientation?: "horizontal" | "vertical"
  disabled?: boolean
  className?: string
}

export const RadioGroup = ({
  options,
  value: controlledValue,
  defaultValue = "",
  onChange,
  name,
  label,
  orientation = "vertical",
  disabled = false,
  className = "",
}: Props) => {
  const [internalValue, setInternalValue] = useState(defaultValue)

  // Определяем, используется ли контролируемое или неконтролируемое состояние
  const isControlled = controlledValue !== undefined
  const selectedValue = isControlled ? controlledValue : internalValue

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  // Эффект для синхронизации defaultValue с internalValue
  useEffect(() => {
    if (!isControlled) {
      setInternalValue(defaultValue)
    }
  }, [defaultValue, isControlled])

  const contextValue: RadioGroupContextType = {
    selectedValue,
    name,
    onChange: handleChange,
    disabled,
  }

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div className={`radio-group`} role="radiogroup">
        {label && <h3 className={s.radioGroupLabel}>{label}</h3>}
        <div className={s.radioOptions + (orientation === "vertical" ? " " + s.vertical : "") + " " + className}>
          {options.map((option) => (
            <RadioButton key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </RadioButton>
          ))}
        </div>
      </div>
    </RadioGroupContext.Provider>
  )
}
