// "use client"
import CloseIcon from "@/shared/assets/svg/Close.svg"
import Button from "@/shared/ui/button/button"
import { Dialog } from "@radix-ui/react-dialog"
import s from "./ModalWindow.module.css"
import Image from "next/image"
import { useEffect } from "react"

type Props = {
  isOpen: boolean
  title: string
  text: string
  isClose: () => void
}

export const ModalWindow = ({ isOpen, title, text, isClose }: Props) => {
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (isOpen) return null
  return (
    <div className={s.fon}>
      <Dialog>
        <div className={s.dialog}>
          <div className={s.header}>
            <h3 className={s.title}>{title}</h3>
            <Button variant="text" className={s.svgButton} onClick={isClose}>
              <Image src={CloseIcon} alt="закрыть" />
            </Button>
          </div>
          <div className={s.main}>
            <p className={s.text}>{text}</p>
            <Button className={s.button} onClick={isClose}>
              ОК
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
