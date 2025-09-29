"use client"
import voidImage from "@/shared/assets/svg/voidImage.svg"
import Image from "next/image"
import { Button } from "@/shared/ui"
import s from "./UploadingPhotoModal.module.css"

type Props = {
  setFilesData: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const UploadingPhotoModal = ({ setFilesData }: Props) => {
  return (
    <>
      <div className={s.imageWrapper}>
        <Image src={voidImage} alt={"void image"} />
      </div>
      <div className={s.buttonsContainer}>
        <Button className={s.button} variant={"primary"}>
          <input accept={"image/png, image/jpeg, image/jpg"} type="file" onChange={(e) => setFilesData(e)} />
          Open from Computer
        </Button>
        <Button className={s.button} variant={"outlined"}>
          Open Draft
        </Button>
      </div>
    </>
  )
}
