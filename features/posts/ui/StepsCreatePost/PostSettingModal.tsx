"use client"
import Image from "next/image"
import Button from "@/shared/ui/button/button"
import CloseIcon from "@/shared/assets/svg/Close.svg"
import ArrowBackIcon from "@/shared/assets/svg/arrow-back.svg"
import { useEffect, useRef, useState } from "react"
import { AddFotoStep } from "./AddFotoStep/AddFotoStep"
import { CroppingStep } from "./CroppingStep/CroppingStep"
import { FilterStep } from "./FiltersStep/FiltersStep"
import { PublicationStep } from "./PublicationStep/PublicationStep"
import { useAppDispatch } from "@/app/hooks/useAppDispatch"
import { addImageAC, selectImages } from "@/features/posts/model/postsSlice"
import { useAppSelector } from "@/app/hooks/useAppSelector"
import { ModalWindow } from "@/features/auth/ui/Register/ModalWindow/ModalWindow"
import { useOutsideClick } from "@/app/hooks/useOutsideClick"
import s from "./PostSettingModal.module.scss"

// Шаги добавления поста
const steps = [
  { key: 0, label: "Add_Photo" },
  { key: 1, label: "Cropping" },
  { key: 2, label: "Filters" },
  { key: 3, label: "Publication" },
]
type Props = {
  isOpenPostSettingModal: boolean
  setIsOpenPostSettingModal: (isOpen: boolean) => void
}

// Компонент модального окна для добавления поста
export const PostSettingModal = ({ isOpenPostSettingModal, setIsOpenPostSettingModal }: Props) => {
  // Открытие  модального окна
  // const [isOpenPostSettingModal, setIsOpenPostSettingModal] = useState<boolean>(isOpen)
  // открытие модального окна при закрытии PostSettingModal
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  //   Шаг настройки поста
  const [currentStep, setCurrentStep] = useState<number>(0)
  const dispatch = useAppDispatch()
  const images = useAppSelector(selectImages)
  //   длина массива шагов
  const totalSteps = steps.length

  //   закрытие модального окна PostSettingModal
  const onClose = () => {
    setIsOpenModal(true)
  }

  // Закрытие дочернего модального окна
  const closeModal = () => setIsOpenModal(false)

  // Закрытие по клавише Escape
  useEffect(() => {
    if (!isOpenPostSettingModal) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpenPostSettingModal, setIsOpenPostSettingModal])

  // закрытие при нажатии за пределы PostSettingModal
  const ref = useRef<HTMLDivElement | null>(null)
  // callback
  useOutsideClick({
    ref,
    action: () => {
      onClose()
    },
  })

  const setFilesData = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e?.target?.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      dispatch(addImageAC({ file }))
      setCurrentStep(1)
    }
  }

  //  открытие окна, под вопросом
  // const isOpenHandel = () => {
  //   setCurrentStep(0)
  //   setIsOpen(true)
  // }

  // Работа с Steps
  // переход на след. шаг
  const goNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1)
    }
  }
  //   возврат к предыдущему  шагу
  const goBackStep = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
    }
  }
  // отрисовка нужного  шага
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <AddFotoStep handle={setFilesData} />
      case 1:
        return <CroppingStep />
      case 2:
        return <FilterStep />
      case 3:
        return <PublicationStep />
      // case 4:
      //   return <StepFour />
      default:
        return null
    }
  }

  useEffect(() => {
    if (images.length === 0) {
      setCurrentStep(0)
    }
  }, [images])

  return (
    isOpenPostSettingModal && (
      <div className={s.fon}>
        <div ref={ref} className={s.window}>
          {currentStep === 0 ? (
            <div className={s.header}>
              <h3 className={s.title}>Add Photo</h3>
              <Button variant="text" className={s.svgButton} onClick={onClose}>
                <Image src={CloseIcon} alt="закрыть" />
              </Button>
            </div>
          ) : (
            <div className={s.header}>
              <Button variant="text" className={s.svgButton} onClick={goBackStep}>
                <Image src={ArrowBackIcon} alt="закрыть" />
              </Button>
              <h3 className={s.title}>{steps.find((obj) => obj.key === currentStep)?.label}</h3>
              {currentStep === steps.length - 1 ? (
                <Button variant="text" className={s.svgButton} onClick={goNextStep}>
                  Publish
                </Button>
              ) : (
                <Button variant="text" className={s.svgButton} onClick={goNextStep}>
                  Next
                </Button>
              )}
            </div>
          )}
          <div className={s.content}>{renderStep()}</div>
        </div>
        <ModalWindow isOpen={isOpenModal} title={"Close"} isClose={closeModal}>
          <p className={s.text}>
            Do you really want to close the creation of a publication?
            <br /> If you close everything will be deleted
          </p>
          <div className={s.buttonBox}>
            <Button
              variant="outlined"
              className={s.button}
              onClick={() => {
                closeModal()
                setIsOpenPostSettingModal(false)
              }}
            >
              Discard
            </Button>
            <Button
              className={s.button}
              onClick={() => {
                closeModal()
                setIsOpenPostSettingModal(false)
              }}
            >
              Save draft
            </Button>
          </div>
        </ModalWindow>
      </div>
    )
  )
}
