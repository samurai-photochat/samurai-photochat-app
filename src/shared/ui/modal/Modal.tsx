import { Dialog } from "radix-ui"
import Image from "next/image"
import CloseIcon from "@/shared/assets/svg/Close.svg"

import s from "./Modal.module.scss"
import { ComponentPropsWithoutRef } from "react"

type Props = {
  open: boolean
  onClose: () => void
  email?: string
} & ComponentPropsWithoutRef<"div">

export const Modal = ({ open, onClose, email, children, ...rest }: Props) => (
  <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
    <Dialog.Portal>
      <Dialog.Overlay className={s.overlay} />
      <Dialog.Content className={s.content}>
        <Dialog.Title className={s.title}>Log Out</Dialog.Title>
        <Dialog.Description className={s.description}>
          Are you sure you want to log out of your account &ldquo;<strong>{email}</strong>&rdquo;?
        </Dialog.Description>

        {children}
        <Dialog.Close asChild>
          <button className={s.iconButton} aria-label="Close">
            <Image src={CloseIcon} alt="Close" />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
