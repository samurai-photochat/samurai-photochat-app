import { ComponentProps } from "react"
import s from "./TextField.module.css"
import * as React from "react"

export type TextFieldProps = {
  label?: string
  errorMessage?: string | undefined
  iconAction?: () => void
  className?: string
  startIcon?: React.ReactNode | null
  endIcon?: React.ReactNode | null
  required?: boolean
} & ComponentProps<"input">

export const TextField = ({
  label,
  type = "text",
  disabled,
  errorMessage,
  iconAction,
  className = "",
  startIcon = null,
  endIcon = null,
  required = false,
  ...rest
}: TextFieldProps) => {
  const dataIconStart = startIcon ? "start" : ""
  const dataIconEnd = endIcon ? "end" : ""
  const dataIcon = dataIconStart + dataIconEnd
  const error = !!errorMessage

  return (
    <div className={s.box + (disabled ? " " + s.disabled : "") + (className ? " " + className : "")}>
      {label && (
        <label className={s.label}>
          {label}
          {required && <span className={s.required}>*</span>}
        </label>
      )}
      <div className={s.inputContainer}>
        {dataIconStart && <span className={s.iconStart}>{startIcon}</span>}
        <input
          type={type}
          className={s.input + (error ? " " + s.error : "")}
          disabled={disabled}
          data-icon={dataIcon}
          {...rest}
        />
        {dataIconEnd && (
          <span className={s.iconEnd} onClick={iconAction}>
            {endIcon}
          </span>
        )}
      </div>
      {!!errorMessage && <span className={s.errorMessage}>{errorMessage}</span>}
    </div>
  )
}
