"use client"
import s from "./Avatar.module.scss"
import Image from "next/image"
import { Button } from "@/shared/ui"
import voidImage from "@/shared/assets/svg/voidImage.svg"
import { AvatarSettingModal } from "../AvatarSettingModal/AvatarSettingModal"
import { useState } from "react"

type Props = {
  avatar?: string
}

export const Avatar = ({ avatar }: Props) => {
  const [isOpenAvatartSettingModal, setIsOpenAvatarSettingModal] = useState<boolean>(false)
  return (
    <div className={s.avatarBlock}>
      <div className={s.avatarWrapper}>
        <Image src={avatar || voidImage} alt={"void image"} className={s.avatar} />
      </div>
      <Button
        variant="outlined"
        className={s.avatarButton}
        onClick={() => {
          setIsOpenAvatarSettingModal(true)
        }}
      >
        Select Profile Photo
      </Button>
      <AvatarSettingModal
        isOpenAvatarSettingModal={isOpenAvatartSettingModal}
        setIsOpenAvatarSettingModalAction={setIsOpenAvatarSettingModal}
      />
    </div>
  )
}
