import Button from "@/shared/ui/button/button"
import React from "react"
import s from "./LogoutContent.module.css"

type Props = {
  logoutHandler: () => void
  onClose: () => void
}

export const LogoutContent = ({ logoutHandler, onClose }: Props) => {
  return (
    <div className={s.wrap}>
      <Button className={s.btn} variant={"outlined"} onClick={logoutHandler}>
        Yes
      </Button>
      <Button className={s.btn} onClick={onClose}>
        No
      </Button>
    </div>
  )
}
