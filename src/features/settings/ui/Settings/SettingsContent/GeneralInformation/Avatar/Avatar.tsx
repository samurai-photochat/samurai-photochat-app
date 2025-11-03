"use client"
import s from "./Avatar.module.scss"
import Image from "next/image"
import { Button } from "@/shared/ui"
import voidImage from "@/shared/assets/svg/voidImage.svg"
import { AvatarSettingModal } from "../AvatarSettingModal/AvatarSettingModal"
import { useState } from "react"
import { useDeleteAvatarMutation } from "@/features/profile/api/profileApi"
import { useAppDispatch } from "@/shared/store/useAppDispatch"
import { baseApi } from "@/shared/api/baseApi"

type Props = {
  avatar?: string
}

export const Avatar = ({ avatar }: Props) => {
  const [isOpenAvatartSettingModal, setIsOpenAvatarSettingModal] = useState<boolean>(false)
  const [deleteAvatar, { isLoading }] = useDeleteAvatarMutation()
  const dispatch = useAppDispatch()

  const deleteAvatarHandler = () => {
    deleteAvatar().then(() => {
      dispatch(baseApi.util.invalidateTags(["Profile"]))
    })
  }
  return (
    <div className={s.avatarBlock}>
      <div className={s.avatarWrapper}>
        {avatar ? (
          <>
            <Image
              src={avatar}
              layout={"responsive"}
              width={1}
              height={1}
              alt={"avatar image"}
              className={s.avatar}
              style={avatar ? { borderRadius: "100%" } : {}}
            />
            <button disabled={isLoading} className={s.deleteButton} onClick={deleteAvatarHandler}></button>)
          </>
        ) : (
          <Image src={voidImage} alt={"void image"} className={s.avatar}></Image>
        )}
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
