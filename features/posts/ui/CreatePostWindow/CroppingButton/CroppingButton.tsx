import { ReactNode, useEffect, useRef, useState } from "react"
import s from "./CroppingButton.module.css"
import { useOutsideClick } from "@/app/hooks/useOutsideClick"

type Props = {
  hidden: ReactNode
  buttonChildren: ReactNode
  hiddenClass?: string
  buttonClass?: string
}

export const CroppingButton = ({ hidden, buttonChildren, hiddenClass = "", buttonClass = "" }: Props) => {
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const toggle = () => {
    setShow(!show)
  }

  useOutsideClick({ ref, action: () => setShow(false) })
  return (
    <div ref={ref} className={s.container}>
      {show && <div className={s.hidden + (hiddenClass ? " " + hiddenClass : "")}>{hidden}</div>}
      <button onClick={toggle} className={s.button + (buttonClass ? " " + buttonClass : "")}>
        {buttonChildren}
      </button>
    </div>
  )
}
