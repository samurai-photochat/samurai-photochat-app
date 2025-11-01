"use client"
import s from "./Avatar.module.scss"
import Image from "next/image"
import { Button } from "@/shared/ui"
import voidImage from "@/shared/assets/svg/voidImage.svg"

type Props = {
  avatar?: string
}

export const Avatar = ({ avatar }: Props) => {
  return (
    <div className={s.avatarBlock}>
      <div className={s.avatarWrapper}>
        <Image src={avatar || voidImage} alt={"void image"} className={s.avatar} />
      </div>
      <Button variant="outlined" className={s.avatarButton}>
        Select Profile Photo
      </Button>
    </div>
  )
}
