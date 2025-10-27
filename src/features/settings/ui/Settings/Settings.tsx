"use client"
import Sidebar from "@/widgets/sidebar/sidebar"
import { SettingsBody } from "@/features/settings/ui/SettingsBody"
import s from "./Settings.module.scss"

export const Settings = () => {
  return (
    <div className={s.page}>
      <Sidebar />
      <SettingsBody />
    </div>
  )
}
