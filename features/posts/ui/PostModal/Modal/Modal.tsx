import { Dialog } from "radix-ui"
import Image from "next/image"
import CloseIcon from "@/shared/assets/svg/Close.svg"

import styles from "./Modal.module.css"
import { ComponentPropsWithoutRef } from "react"

type Props = {
  open: boolean
  onClose: () => void
} & ComponentPropsWithoutRef<"div">

export const Modal = ({ open, onClose, children, ...rest }: Props) => (
  <Dialog.Root open={open} {...rest}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.Overlay} />
      <Dialog.Content className={styles.Content}>
        <Dialog.Title className={styles.Title}></Dialog.Title>
        <Dialog.Description className={styles.Description}></Dialog.Description>

        {children}
        <Dialog.Close asChild>
          <button className={styles.IconButton} aria-label="Close" onClick={onClose}>
            <Image src={CloseIcon} alt="Close" />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
