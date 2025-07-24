import { ComponentProps, useState } from "react"
import s from "./text-field.module.css"
import { EyeIcon } from "@/shared/assets/icons/components"
import { SearchIcon } from "@/shared/assets/icons/components"
import * as React from "react"
import { EyeOffIcon } from "@/shared/assets/icons/components"

type TextFieldProps = {
  label?: string
  isSearch?: boolean
  errorMessage?: string | undefined
} & ComponentProps<"input">

export const TextField = ({ label, isSearch, type, disabled, errorMessage, ...rest }: TextFieldProps) => {
  const isPassword = type === "password"
  const dataIconStart = isSearch ? "start" : ""
  const dataIconEnd = isPassword ? "end" : ""
  const dataIcon = dataIconStart + dataIconEnd
  const [inputType, setInputType] = useState(type)
  const error = !!errorMessage

  return (
    <div className={s.box + (disabled ? " " + s.disabled : "")}>
      {label && <label className={s.label}>{label}</label>}
      <div className={s.inputContainer}>
        {isSearch && <span className={s.iconStart}>{<SearchIcon />}</span>}
        <input
          className={s.input + (error ? " " + s.error : "")}
          type={inputType}
          disabled={disabled}
          data-icon={dataIcon}
          {...rest}
        />
        {isPassword && (
          <span className={s.iconEnd} onClick={() => setInputType(inputType === "password" ? "text" : "password")}>
            {inputType === "password" ? <EyeOffIcon /> : <EyeIcon />}
          </span>
        )}
      </div>
      {!!errorMessage && <span className={s.errorMessage}>{errorMessage}</span>}
    </div>
  )
}
