"use client"
import { SettingsSection } from "@/features/settings/ui/Settings/types"
import { Button } from "@/shared/ui"
import s from "./Settings.module.scss"
import { SettingsContent } from "@/features/settings/ui/Settings/SettingsContent"
import { useState } from "react"

export const Settings = () => {
  const sections: SettingsSection[] = [
    { type: "general-information", title: "General information" },
    { type: "devices", title: "Devices" },
    { type: "account-management", title: "Account Management" },
    { type: "my-payments", title: "My payments" },
  ]

  const [sectionType, setSectionType] = useState(sections[0].type)
  return (
    <div className={s.container}>
      <div className={s.sections}>
        {sections.map((section: SettingsSection) => {
          const onClickHandler = () => {
            setSectionType(section.type)
          }
          return (
            <Button
              variant={"outlined"}
              key={section.type}
              onClick={onClickHandler}
              // disabled={section.type === sectionType}
              className={s.section}
              style={
                section.type !== sectionType
                  ? {
                      borderColor: `var(--color-dark-100)`,
                      color: "var(--color-dark-100)",
                    }
                  : {}
              }
            >
              {section.title}
            </Button>
          )
        })}
      </div>
      <SettingsContent sectionType={sectionType} />
    </div>
  )
}
