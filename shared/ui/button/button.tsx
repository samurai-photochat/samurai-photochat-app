import { ComponentPropsWithoutRef, ElementType, ReactElement, ReactNode } from "react"
import s from "./button.module.scss"

export type ButtonProps<T extends ElementType = "button"> = {
  as?: T
  children?: ReactNode
  variant?: "primary" | "secondary" | "outlined" | "text"
  fullWidth?: boolean
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = "button">(props: ButtonProps<T>) => {
  const { variant = "primary", fullWidth, className, as: Component = "button", children, ...rest } = props
  return (
    <Component className={`${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ""} ${className}`} {...rest}>
      {children}
    </Component>
  )
}

export default Button as <T extends ElementType = "button">(props: ButtonProps<T>) => ReactElement
