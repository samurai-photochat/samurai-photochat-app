import { Dialog } from "radix-ui"
import Image from "next/image"
import CloseIcon from "@/shared/assets/svg/Close.svg"

import s from "./ModalWindow.module.scss"
import { ComponentPropsWithoutRef, ReactNode } from "react"
import { Button } from "@/shared/ui"
import Checkbox from "@/shared/ui/checkbox/checkbox"
import { createPortal } from "react-dom"

type ButtonType = {
  title: string
  onClick: () => void
  disabled?: boolean
}

type ButtonsContent = {
  buttons: ButtonType[]
  className?: string
}

type CheckBoxContent = {
  title: string
  onChange: (checked: boolean) => void
  className?: string
}

type Props = {
  title: string
  open: boolean
  onClose: () => void
  description: ReactNode
  buttonsContent: ButtonsContent
  checkBoxContent?: CheckBoxContent
} & ComponentPropsWithoutRef<"div">

export const ModalWindow = ({
  title,
  open,
  onClose,
  description,
  buttonsContent,
  className,
  checkBoxContent,
  ...rest
}: Props) => {
  const { buttons, className: buttonsClassname } = buttonsContent
  return createPortal(
    <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.content + " " + className}>
          <Dialog.Title className={s.title}>{title}</Dialog.Title>
          <Dialog.Description className={s.description}>{description}</Dialog.Description>
          <div className={s.buttons + " " + buttonsClassname}>
            {checkBoxContent && (
              <div className={s.checkbox}>
                <Checkbox onChange={checkBoxContent.onChange} />
                {checkBoxContent.title}
              </div>
            )}
            {buttons.map((button, index) => (
              <Button
                disabled={button.disabled}
                onClick={button.onClick}
                variant={index === buttons.length - 1 ? "primary" : "outlined"}
                key={index}
              >
                {button.title}
              </Button>
            ))}
          </div>
          <Dialog.Close asChild>
            <button className={s.iconButton} aria-label="Close">
              <Image src={CloseIcon} alt="Close" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>,
    document.body
  )
}
