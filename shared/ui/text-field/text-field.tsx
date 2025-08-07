import { ComponentProps } from "react"
import s from "./text-field.module.css"
import { EyeIcon } from "@/shared/assets/icons/components"
import { SearchIcon } from "@/shared/assets/icons/components"
import * as React from "react"
import { EyeOffIcon } from "@/shared/assets/icons/components"

type TextFieldProps = {
  label?: string
  search?: boolean
  password?: boolean
  errorMessage?: string | undefined
  iconAction?: () => void
} & ComponentProps<"input">

export const TextField = ({
  label,
  search,
  password,
  type = password ? "password" : "text",
  disabled,
  errorMessage,
  iconAction,
  ...rest
}: TextFieldProps) => {
  const dataIconStart = search ? "start" : ""
  const dataIconEnd = password ? "end" : ""
  const dataIcon = dataIconStart + dataIconEnd
  const error = !!errorMessage

  return (
    <div className={s.box + (disabled ? " " + s.disabled : "")}>
      {label && <label className={s.label}>{label}</label>}
      <div className={s.inputContainer}>
        {search && <span className={s.iconStart}>{<SearchIcon />}</span>}
        <input
          type={type}
          className={s.input + (error ? " " + s.error : "")}
          disabled={disabled}
          data-icon={dataIcon}
          {...rest}
        />
        {password && (
          <span className={s.iconEnd} onClick={iconAction}>
            {type === "password" ? <EyeOffIcon /> : <EyeIcon />}
          </span>
        )}
      </div>
      {!!errorMessage && <span className={s.errorMessage}>{errorMessage}</span>}
    </div>
  )
}
