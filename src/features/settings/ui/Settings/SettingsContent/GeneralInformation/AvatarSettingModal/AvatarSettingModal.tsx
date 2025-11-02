// import { useState } from "react"
import NextImage from "next/image"
import Button from "@/shared/ui/button/button"
import CloseIcon from "@/shared/assets/svg/Close.svg"
import { useOutsideClick } from "@/shared/hooks/useOutsideClick"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { AddFotoStep } from "@/features/posts/ui/StepsCreatePost/AddFotoStep/AddFotoStep"
import { CanvasImage } from "@/features/posts/ui/StepsCreatePost/CroppingStep/CroppingStep"
import { SettingStap } from "./SettingStep/SettingStep"
import s from "./AvatarSettingModal.module.scss"

type Props = {
  isOpenAvatarSettingModal: boolean
  setIsOpenAvatarSettingModalAction: (isOpen: boolean) => void
}
type AvatarType = {
  file: File
  url: string
  filter: string
  zoom: number
  scale: number
  preview: string
}
// Компонент модального окна для добавления аватарки
export const AvatarSettingModal = ({ isOpenAvatarSettingModal, setIsOpenAvatarSettingModalAction }: Props) => {
  //   локальное сохранение аватарки
  const [avatar, setAvatar] = useState<AvatarType | null>(null)
  //   переключения между шагами
  const [step, setStep] = useState<1 | 2>(1)
  //   добавление файла
  const addImage = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e?.target?.files) {
      const file = e.target.files[0]
      const src = URL.createObjectURL(file)

      const avatar: CanvasImage = {
        file,
        url: src,
        filter: "",
        zoom: 1,
        scale: 490 / 504,
        preview: "",
      }
      setAvatar(avatar)
      setStep(2)
    }
  }
  //   ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
  //   закрытие модального окна AvatarSettingModal
  const onClose = () => {
    setAvatar(null)
    setStep(1)
    setIsOpenAvatarSettingModalAction(false)
  }
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
  }, [isOpenAvatarSettingModal, setIsOpenAvatarSettingModalAction])
  // закрытие при нажатии за пределы AvatarSettingModal
  const ref = useRef<HTMLDivElement | null>(null)
  // callback
  useOutsideClick({
    ref,
    action: () => {
      onClose()
    },
  })

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
                  <div>
                    <div>
                      <SettingStap image={avatar} />
                    </div>
                    <div className={s.buttonBox}>
                      <Button
                        className={s.button}
                        onClick={() => {
                          onClose()
                          // запрос
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
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
