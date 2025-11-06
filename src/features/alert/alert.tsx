"use client"

import { useAppDispatch } from "@/shared/store/useAppDispatch"
import { useAppSelector } from "@/shared/store/useAppSelector"
import { selectError, selectSuccess, setAppError, setAppSuccess } from "@/shared/store/appSlice"
import { Dialog, DialogContent, DialogDescription, DialogClose, DialogTitle } from "@radix-ui/react-dialog"
import s from "./alert.module.css"
import Image from "next/image"
import Close from "@/shared/assets/svg/Close.svg"

export const Alert = () => {
  // alert для вывода ошибок или сообщений(внутрених)
  const error = useAppSelector(selectError)
  // заглушка на сообщения
  const success = useAppSelector(selectSuccess)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(setAppError({ error: null }))
    dispatch(setAppSuccess({ success: "" }))
    // обнуление сообщений
    // dispatch...
  }

  const className = s.container + (error ? " " + s.error : "")
  return (
    <Dialog open={!!(error || success)} onOpenChange={handleClose}>
      <DialogContent className={className}>
        <div className={s.block}>
          <DialogTitle />
          <DialogDescription className={s.text}>{error || success}</DialogDescription>
          <DialogClose onClick={handleClose} className={s.button}>
            <Image src={Close} alt={"закрыть"} />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
