"use client"

import * as Dialog from "@radix-ui/react-dialog"

import { ReactNode, useMemo, Suspense } from "react"

import { PostModalContextProvider } from "./context/PostModalContext"
import { PostModalBody } from "./PostModalBody"
import { CloseOutline } from "@/shared/assets/icons/components"

import s from "./PostModal.module.scss"
import { VisuallyHidden } from "radix-ui"

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
  //todo: Сделать закрытие модалки по клику за область
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostModalContextProvider postId={postId} isOpen={isOpen} onDismiss={onClose}>
        <Dialog.Root open={isOpen}>
          {/*onOpenChange={(next) => !next && onClose()}>*/}
          <Dialog.Portal>
            <Dialog.Overlay className={s.overlay} />
            <VisuallyHidden.Root>
              <Dialog.Title>Hidden Dialog Title</Dialog.Title>
            </VisuallyHidden.Root>
            <Dialog.Content className={s.contentWrapper}>
              <Dialog.Close className={s.closeButton} aria-label="Закрыть">
                <div onClick={onClose}>
                  <CloseOutline />
                </div>
              </Dialog.Close>
              <div className={s.content}>{content}</div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </PostModalContextProvider>
    </Suspense>
  )
}
