"use client"
import s from "./GeneralInformation.module.scss"
import { UserForm } from "@/features/settings/ui"
import { Avatar } from "@/features/settings/ui/Settings/SettingsContent/GeneralInformation/Avatar"
import { Button } from "@/shared/ui"
import { useGetProfileQuery, useUpdateProfileMutation } from "@/features/profile/api/profileApi"
import { useState } from "react"
import { UpdateProfileRequest } from "@/features/profile/api/profile.types"
import { useDispatch } from "react-redux"
import { setAppSuccess } from "@/shared/store/appSlice"

export const GeneralInformation = () => {
  const { data } = useGetProfileQuery()

  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

  const [isInvalid, setIsInvalid] = useState<boolean>(false)

  const dispatch = useDispatch()

  const updateInformation = async (updateData: UpdateProfileRequest) => {
    await updateProfile(updateData)
    dispatch(setAppSuccess({ success: "Your settings are saved!" }))
  }

  return (
    <>
      <div className={s.infoBox}>
        <Avatar avatar={data?.avatars[0]?.url} />
        <UserForm data={data} setError={setIsInvalid} submitAction={updateInformation} />
      </div>
      <hr className={s.line} />
      <Button disabled={isInvalid || isLoading} type={"submit"} form={"user-form"} className={s.submitButton}>
        Save Changes
      </Button>
    </>
  )
}
