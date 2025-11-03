// import { useState } from "react"
import NextImage from "next/image"
import Button from "@/shared/ui/button/button"
import CloseIcon from "@/shared/assets/svg/Close.svg"
import { useOutsideClick } from "@/shared/hooks/useOutsideClick"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { AddFotoStep } from "@/features/posts/ui/StepsCreatePost/AddFotoStep/AddFotoStep"
import { SettingStep } from "./SettingStep/SettingStep"
import s from "./AvatarSettingModal.module.scss"

type Props = {
  isOpenAvatarSettingModal: boolean
  setIsOpenAvatarSettingModalAction: (isOpen: boolean) => void
}
type AvatarType = {
  file: File
  url: string
}
// Компонент модального окна для добавления аватарки
export const AvatarSettingModal = ({ isOpenAvatarSettingModal, setIsOpenAvatarSettingModalAction }: Props) => {
  //   локальное сохранение аватарки
  const [avatar, setAvatar] = useState<AvatarType | null>(null)
  //   добавление файла
  const addImage = (e: ChangeEvent<HTMLInputElement> | null) => {
    if (e?.target?.files) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      const avatar: AvatarType = { file, url }
      setAvatar(avatar)
    }
  }
  //   ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
  //   закрытие модального окна AvatarSettingModal
  const onClose = useCallback(() => {
    setAvatar(null)
    setIsOpenAvatarSettingModalAction(false)
  }, [setIsOpenAvatarSettingModalAction])
  // закрытие при нажатии за пределы AvatarSettingModal
  const ref = useRef<HTMLDivElement | null>(null)
  // callback
  useOutsideClick({
    ref,
    action: () => {
      onClose()
    },
  })
  // Закрытие по клавише Escape
  useEffect(() => {
    if (!isOpenAvatarSettingModal) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpenAvatarSettingModal, onClose, setIsOpenAvatarSettingModalAction])
  //   ОТРИСОВКА
  return (
    isOpenAvatarSettingModal && (
      <>
        {createPortal(
          <div className={s.fon}>
            <div ref={ref} className={s.window}>
              <div className={s.header}>
                <h3 className={s.title}>Add a Profile Photo</h3>
                <Button variant="text" className={s.svgButton} onClick={onClose}>
                  <NextImage src={CloseIcon} alt="закрыть" />
                </Button>
              </div>
              <div className={s.content}>
                {avatar === null ? (
                  <AddFotoStep handle={addImage} openDraft={() => {}} />
                ) : (
                  <SettingStep onClose={onClose} file={avatar.file} url={avatar.url} />
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
      </>
    )
  )
}
