// "use client"
import CloseIcon from "@/shared/assets/svg/Close.svg"
import Button from "@/shared/ui/button/button"
import { Dialog } from "@radix-ui/react-dialog"
import s from "./ModalWindow.module.css"
import Image from "next/image"
import { ReactNode, useEffect } from "react"

type Props = {
  isFon?: boolean
  isOpen: boolean
  title: string
  children: ReactNode
  isClose: () => void
}

export const ModalWindow = ({ isOpen, title, isClose, children, isFon }: Props) => {
  // проверка наличие фона в пропсах
  const fon = isFon ?? false
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null
  return (
    <>
      <div className={fon ? s.fon : s.noFon} />
      <Dialog>
        <div className={s.dialog}>
          <div className={s.header}>
            <h3 className={s.title}>{title}</h3>
            <Button variant="text" className={s.svgButton} onClick={isClose}>
              <Image src={CloseIcon} alt="закрыть" />
            </Button>
          </div>
          <div className={s.main}>{children}</div>
        </div>
      </Dialog>
    </>
  )
}
