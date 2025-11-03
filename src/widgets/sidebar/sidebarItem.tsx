import { Button } from "@/shared/ui"
import { ButtonProps } from "@/shared/ui/button/button"
import { usePathname } from "next/navigation"
import { ElementType, ReactNode } from "react"
import s from "./sidebar.module.css"
import Link from "next/link"

export type SidebarItemProps = {
  as?: "a" | "button"
  active?: boolean
  children?: React.ReactNode
  variant?: "primary" | "secondary" | "outlined" | "text"
  fullWidth?: boolean
  href?: string
  onClick?: () => void
  icon: React.ReactNode
  activeIcon: React.ReactNode
  className?: string
}

export const SidebarItem = ({
  as = "button",
  href,
  onClick,
  children,
  active,
  variant = "text",
  fullWidth = true,
  className,
  icon,
  activeIcon,
}: SidebarItemProps) => {
  const pathname = usePathname()
  const isLink = as === "a" && typeof href === "string"
  const isActive = isLink ? pathname === href : active

  console.log(pathname)
  console.log(isLink)
  console.log(isActive)

  const content = (
    <Button
      as={isLink ? "span" : as}
      onClick={onClick}
      variant={variant}
      fullWidth={fullWidth}
      className={`${s.sidebarBtn} ${className ?? ""} ${isActive ? s.active : ""}`}
    >
      {isActive ? activeIcon : icon}
      {children}
    </Button>
  )

  return isLink && href ? (
    <Link href={href} className={s.sidebarLink}>
      {content}
    </Link>
  ) : (
    content
  )
}
