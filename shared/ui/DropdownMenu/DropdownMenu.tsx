"use client"
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu"
import Button from "@/shared/ui/button/button"
import React from "react"
import s from "./DropdownMenu.module.scss"
import { ThreeDots } from "@/shared/assets/icons/components/ThreeDots"

export type ContextMenuItem = {
  key?: string
  label: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
  icon?: React.ReactNode
}

export type ContextMenuProps = {
  trigger?: string
  items?: ContextMenuItem[]
  children?: React.ReactNode
  align: "start" | "center" | "end"
  sideOffset: number
}

export const DropdownMenu = ({ trigger, items, children, align, sideOffset }: ContextMenuProps) => {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    if (!open) return
    const handleScroll = () => setOpen(false)
    window.addEventListener("wheel", handleScroll, { passive: true })
    window.addEventListener("touchmove", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("wheel", handleScroll)
      window.removeEventListener("touchmove", handleScroll)
    }
  }, [open])
  const renderItems = (arr: ContextMenuItem[]) =>
    arr.map((item, idx) => (
      <RadixDropdownMenu.Item
        key={item.key ?? `item-${idx}`}
        onSelect={item.onSelect}
        disabled={item.disabled}
        className={s.contextMenuItem}
      >
        <span>{item.icon}</span>
        <span>{item.label}</span>
      </RadixDropdownMenu.Item>
    ))
  const renderedChildren = React.Children.map(children, (child, idx) => {
    if (child === null || child === undefined) return null
    if (React.isValidElement(child)) {
      return (
        <RadixDropdownMenu.Item key={child.key ?? `child-${idx}`} asChild className={s.contextMenuItem}>
          {child}
        </RadixDropdownMenu.Item>
      )
    }
    return (
      <RadixDropdownMenu.Item key={`child-${idx}`} className={s.contextMenuItem}>
        <span className={s.contextMenuLabel}>{child}</span>
      </RadixDropdownMenu.Item>
    )
  })
  return (
    <RadixDropdownMenu.Root open={open} onOpenChange={setOpen}>
      <RadixDropdownMenu.Trigger asChild>
        {trigger ? (
          <Button className={open ? s.triggerButtonOpen : s.triggerButton}>{trigger}</Button>
        ) : (
          <Button variant={"text"} className={open ? `${s.triggerButton} ${s.triggerButtonOpen}` : s.triggerButton}>
            <ThreeDots />
          </Button>
        )}
      </RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content align={align} sideOffset={sideOffset} className={s.contextMenuContent}>
          {items ? renderItems(items) : renderedChildren}
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  )
}
