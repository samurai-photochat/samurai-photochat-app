"use client"
import NextImage from "next/image"
import Button from "@/shared/ui/button/button"
import CloseIcon from "@/shared/assets/svg/Close.svg"
import ArrowBackIcon from "@/shared/assets/svg/arrow-back.svg"
import { useEffect, useRef, useState } from "react"
import { AddFotoStep } from "./AddFotoStep/AddFotoStep"
import { CanvasImage, CroppingStep } from "./CroppingStep/CroppingStep"
import { FilterStep } from "./FiltersStep/FiltersStep"
import { PublicationStep } from "./PublicationStep/PublicationStep"
import { useAppDispatch } from "@/app/hooks/useAppDispatch"
import { addImageAC, addPostAC, changeImageAC, clearImagesAC, selectImages } from "@/features/posts/model/postsSlice"
import { useAppSelector } from "@/app/hooks/useAppSelector"
import { ModalWindow } from "@/features/auth/ui/Register/ModalWindow/ModalWindow"
import { useOutsideClick } from "@/app/hooks/useOutsideClick"
import s from "./PostSettingModal.module.scss"
import { ApiErrorResultDto } from "@/features/auth/api/authApi.types"
import { setAppError } from "@/app/model/appSlice"
import { useCreatePostMutation, useUploadImagesMutation } from "@/features/posts/api/postsApi"

// Шаги добавления поста
const steps = [
  { key: 0, label: "Add_Photo" },
  { key: 1, label: "Cropping" },
  { key: 2, label: "Filters" },
  { key: 3, label: "Publication" },
]
type Props = {
  isOpenPostSettingModal: boolean
  setIsOpenPostSettingModalAction: (isOpen: boolean) => void
}

// Компонент модального окна для добавления поста
export const PostSettingModal = ({ isOpenPostSettingModal, setIsOpenPostSettingModalAction }: Props) => {
  // открытие модального окна при закрытии PostSettingModal
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  //   Шаг настройки поста
  const [currentStep, setCurrentStep] = useState<number>(0)
  const dispatch = useAppDispatch()
  const images = useAppSelector(selectImages)
  //   длина массива шагов
  const totalSteps = steps.length

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // закрытие при нажатии за пределы PostSettingModal
  const ref = useRef<HTMLDivElement | null>(null)
  // callback
  useOutsideClick({
    ref,
    action: () => {
      onClose()
    },
  })

  const [createPost] = useCreatePostMutation()

  const [uploadImage] = useUploadImagesMutation()

  const [description, setDescription] = useState("")

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
  }, [isOpenPostSettingModal, setIsOpenPostSettingModalAction])

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

  const createPostHandler = async () => {
    const formData = new FormData()
    images.forEach((image) => formData.append("file", image.file))
    uploadImage(formData)
      .then((imageRes) => {
        if (imageRes.error) {
          if ("data" in imageRes.error && imageRes.error.data) {
            const errorData = imageRes.error.data as ApiErrorResultDto
            dispatch(setAppError({ error: errorData.messages[0].message }))
          }
        } else {
          createPost({
            description,
            childrenMetadata: imageRes.data.images.map((image) => {
              return {
                uploadId: image.uploadId,
              }
            }),
          })
            .then((res) => {
              if (res.error) {
                if ("data" in res.error && res.error.data) {
                  const errorData = res.error.data as ApiErrorResultDto
                  dispatch(setAppError({ error: errorData.messages[0].message }))
                }
              } else {
                dispatch(addPostAC({ post: res.data }))
              }
            })
            .catch((err) => dispatch(setAppError({ error: err?.data?.messages[0]?.message })))
        }
      })
      .catch((err) => dispatch(setAppError({ error: err?.data?.messages[0]?.message })))
  }

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
        return <AddFotoStep handle={addImage} openDraft={openDraft} />
      case 1:
        return <CroppingStep addImage={addImage} />
      case 2:
        return <FilterStep />
      case 3:
        return <PublicationStep description={description} setDescription={setDescription} />
      default:
        return null
    }
  }

  const openDraft = () => {
    goNextStep()
  }

  const setFilters = () => {
    images.forEach((image, index) => {
      const { file, src, zoom, scale, filter } = image
      const canvas = canvasRef.current
      const context = canvas?.getContext("2d")
      const imgElement = new Image()
      imgElement.src = src
      if (canvas && context) {
        const zoomedWidth = imgElement.width * zoom
        const zoomedHeight = imgElement.height * zoom
        const translateX = (imgElement.width - zoomedWidth) / 2
        const translateY = (imgElement.height - zoomedHeight) / 2

        canvas.width = imgElement.width
        canvas.height = imgElement.height

        if (canvas.width / scale > canvas.height) {
          canvas.width = canvas.height * scale
        } else canvas.height = canvas.width / scale

        context.clearRect(0, 0, imgElement.width, imgElement.height)

        context.filter = filter
        context.save()
        context.translate(translateX, translateY)
        context.scale(zoom, zoom)
        context.drawImage(
          imgElement,
          (canvas.width - imgElement.width) / 2,
          (canvas.height - imgElement.height) / 2,
          imgElement.width,
          imgElement.height
        )

        const fileExtension = (file.name.split(".").pop() || "").toLowerCase()
        let mimeType
        switch (fileExtension) {
          case "jpg":
          case "jpeg":
            mimeType = "image/jpeg"
            break
          case "png":
            mimeType = "image/png"
            break
          default:
            mimeType = "image/png"
        }

        canvas.toBlob((blob) => {
          if (blob) {
            const newFile = new File([blob], file.name, { type: blob.type })
            dispatch(changeImageAC({ index, image: { file: newFile } }))
          }
        }, mimeType)
      }
    })
  }

  useEffect(() => {
    if (images.length === 0) {
      setCurrentStep(0)
    }
  }, [images])

  useEffect(() => {
    if (currentStep === 3) {
      setFilters()
    }
  }, [currentStep])

  return (
    isOpenPostSettingModal && (
      <div className={s.fon}>
        <canvas style={{ position: "absolute", opacity: 0, width: "1px", height: "1px" }} ref={canvasRef}></canvas>
        <div ref={ref} className={s.window}>
          {currentStep === 0 ? (
            <div className={s.header}>
              <h3 className={s.title}>Add Photo</h3>
              <Button variant="text" className={s.svgButton} onClick={onClose}>
                <NextImage src={CloseIcon} alt="закрыть" />
              </Button>
            </div>
          ) : (
            <div className={s.header}>
              <Button variant="text" className={s.svgButton} onClick={goBackStep}>
                <NextImage src={ArrowBackIcon} alt="закрыть" />
              </Button>
              <h3 className={s.title}>{steps.find((obj) => obj.key === currentStep)?.label}</h3>
              {currentStep === steps.length - 1 ? (
                <Button variant="text" className={s.svgButton} onClick={createPostHandler}>
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
                dispatch(clearImagesAC())
                closeModal()
                setIsOpenPostSettingModalAction(false)
              }}
            >
              Discard
            </Button>
            <Button
              className={s.button}
              onClick={() => {
                closeModal()
                setIsOpenPostSettingModalAction(false)
                setCurrentStep(0)
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
