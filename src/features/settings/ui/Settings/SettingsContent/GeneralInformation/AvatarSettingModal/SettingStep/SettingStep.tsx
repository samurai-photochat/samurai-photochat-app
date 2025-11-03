"use client"
import { useRef } from "react"
import s from "./SettingStep.module.scss"
import { useCanvas } from "@/features/settings/ui/Settings/SettingsContent/GeneralInformation/AvatarSettingModal/useCanvas/useCanvas"
import { Button } from "@/shared/ui"
import { useUploadAvatarMutation } from "@/features/profile/api/profileApi"
import { useAppDispatch } from "@/shared/store/useAppDispatch"
import { baseApi } from "@/shared/api/baseApi"

type Props = {
  file: File
  url: string
  onClose: () => void
}

export const SettingStep = ({ file, url, onClose }: Props) => {
  const ref = useRef<HTMLHeadingElement | null>(null)

  const { canvasRef, handleWheel, handlePointerUp, handlePointerMove, handlePointerDown, generateEditedFile } =
    useCanvas({
      imageUrl: url,
      file,
    })

  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation()

  const dispatch = useAppDispatch()

  const uploadAvatarHandler = async () => {
    generateEditedFile().then((res) => {
      if (res) {
        const formData = new FormData()
        formData.append("file", file)
        uploadAvatar(formData).then(() => {
          dispatch(baseApi.util.invalidateTags(["Profile"]))
          onClose()
        })
      }
    })
  }

  return (
    <div ref={ref} className={s.content}>
      <canvas
        ref={canvasRef}
        className={s.image}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
      <Button disabled={isLoading} className={s.button} onClick={uploadAvatarHandler}>
        Save
      </Button>
    </div>
  )
}
