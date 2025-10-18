"use client"

import * as Dialog from "@radix-ui/react-dialog"

import { ReactNode, useMemo } from "react"

import { PostModalContextProvider } from "../context/PostModalContext"
import { PostModalBody } from "./PostModalBody"
import { CloseOutline } from "@/shared/assets/icons/components"

import s from "./PostModal.module.scss"

type PostModalProps = {
  isOpen: boolean
  postId: number | null
  onClose: () => void
}

export const PostModal = ({ isOpen, postId, onClose }: PostModalProps) => {
  const content: ReactNode = useMemo(() => {
    if (!isOpen || !postId) {
      return null
    }

    return <PostModalBody />
  }, [isOpen, postId])

  return (
    <PostModalContextProvider postId={postId} isOpen={isOpen} onDismiss={onClose}>
      <Dialog.Root open={isOpen} onOpenChange={(next) => !next && onClose()}>
        <Dialog.Portal>
          <Dialog.Overlay className={s.overlay} />
          <Dialog.Content className={s.contentWrapper}>
            <Dialog.Close className={s.closeButton} aria-label="Закрыть">
              <CloseOutline />
            </Dialog.Close>
            <div className={s.content}>{content}</div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </PostModalContextProvider>
  )
}
