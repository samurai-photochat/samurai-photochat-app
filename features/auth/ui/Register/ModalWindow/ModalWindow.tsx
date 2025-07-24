// "use client"
import CloseIcon from "@/shared/assets/svg/Close.svg"
import Button from "@/shared/ui/button/button"
import { Dialog } from "@radix-ui/react-dialog"
import s from "./ModalWindow.module.css"
import Image from "next/image"

type Props = {
  isOpen: boolean
  isClose: () => void
  title: string
  text: string
}

export const ModalWindow = ({ title, text, isClose, isOpen }: Props) => {
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
            <Button className={s.button}>ОК</Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
