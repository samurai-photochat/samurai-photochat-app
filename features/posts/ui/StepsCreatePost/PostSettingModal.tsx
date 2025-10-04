"use client"
import Image from "next/image"
import Button from "@/shared/ui/button/button"
import CloseIcon from "@/shared/assets/svg/Close.svg"
import ArrowBackIcon from "@/shared/assets/svg/arrow-back.svg"
import { useEffect, useState } from "react"
import { AddFotoStep } from "./AddFotoStep/AddFotoStep"
import { CanvasImage, CroppingStep } from "./CroppingStep/CroppingStep"
import { FilterStep } from "./FiltersStep/FiltersStep"
import s from "./PostSettingModal.module.scss"
import { PublicationStep } from "./PublicationStep/PublicationStep"
import { useAppDispatch } from "@/app/hooks/useAppDispatch"
import { addImageAC, selectImages } from "@/features/posts/model/postsSlice"
import { useAppSelector } from "@/app/hooks/useAppSelector"

// Шаги добавления поста
const steps = [
  { key: 0, label: "Add_Photo" },
  { key: 1, label: "Cropping" },
  { key: 2, label: "Filters" },
  { key: 3, label: "Publication" },
]

// Компонент модального окна для добавления поста
export const PostSettingModal = () => {
  // Открытие  модального окна
  const [isOpen, setIsOpen] = useState(true)
  //   Шаг настройки поста
  const [currentStep, setCurrentStep] = useState(0)
  const dispatch = useAppDispatch()
  const images = useAppSelector(selectImages)
  //   длина массива шагов
  const totalSteps = steps.length

  const addImage = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e?.target?.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      const src = URL.createObjectURL(file)

      const image: CanvasImage = {
        file,
        src,
        filter: "",
        zoom: 1,
        scale: 490 / 504,
        preview: "",
      }
      dispatch(addImageAC({ image }))
      setCurrentStep(1)
    }
  }

  // создание URl
  // let url = null
  // if (file !== undefined) {
  //   url = URL.createObjectURL(file)
  // }
  //   закрытие окна
  const isClose = () => setIsOpen(false)
  // переход на след. шаг
  const goNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1)
    }
  }
  //   возврат к предыддущему  шагу
  const goBackStep = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
    }
  }
  // отрисовка нужного  шага
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <AddFotoStep handle={addImage} openDraft={goNextStep} />
      case 1:
        return <CroppingStep addImage={addImage} />
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
  //  открытие окна, под вопросом
  // const isOpenHandel = () => {
  //   setCurrentStep(0)
  //   setIsOpen(true)
  // }

  useEffect(() => {
    if (images.length === 0) {
      setCurrentStep(0)
    }
  }, [images])

  return (
    isOpen && (
      <div className={s.background}>
        <div className={s.window}>
          {currentStep === 0 ? (
            <div className={s.header}>
              <h3 className={s.title}>Add Photo</h3>
              <Button variant="text" className={s.svgButton} onClick={isClose}>
                <Image src={CloseIcon} alt="закрыть" />
              </Button>
            </div>
          ) : (
            <div className={s.header}>
              <Button variant="text" className={s.svgButton} onClick={goBackStep}>
                <Image src={ArrowBackIcon} alt="закрыть" />
              </Button>
              <h3 className={s.title}>{steps.find((obj) => obj.key === currentStep)?.label}</h3>
              <Button variant="text" className={s.svgButton} onClick={goNextStep}>
                {/* <Image src={CloseIcon} alt="закрыть" /> */}
                Next
              </Button>
            </div>
          )}
          <div className={s.content}>{renderStep()}</div>
        </div>
      </div>
    )
  )
}
