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
import { ModalWindow } from "@/shared/ui/ModalWindow"

type Props = {
  avatar?: string
}

export const Avatar = ({ avatar }: Props) => {
  const [isOpenAvatarSettingModal, setIsOpenAvatarSettingModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
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
            <button className={s.deleteButton} onClick={() => setIsOpenDeleteModal(true)}></button>
            )
            <ModalWindow
              title={"Delete Photo"}
              open={isOpenDeleteModal}
              onClose={() => setIsOpenDeleteModal(false)}
              description={<span>Are you sure you want to delete the photo?</span>}
              buttonsContent={{
                buttons: [
                  { title: "Yes", onClick: deleteAvatarHandler, disabled: isLoading },
                  { title: "No", onClick: () => setIsOpenDeleteModal(false) },
                ],
                className: s.modalButtons,
              }}
            />
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
        isOpenAvatarSettingModal={isOpenAvatarSettingModal}
        setIsOpenAvatarSettingModalAction={setIsOpenAvatarSettingModal}
      />
    </div>
  )
}
