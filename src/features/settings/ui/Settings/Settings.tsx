"use client"
import { SettingsSection } from "@/features/settings/ui/Settings/types"
import { Button } from "@/shared/ui"
import s from "./Settings.module.scss"
import { ReactNode, useState } from "react"
import Link from "next/link"
import { PATH } from "@/shared/config/routes"

type Props = {
  children: ReactNode
}

export const Settings = ({ children }: Props) => {
  const sections: SettingsSection[] = [
    { type: "general-information", title: "General information", path: PATH.USER.GENERAL_INFORMATION },
    { type: "devices", title: "Devices", path: PATH.USER.DEVICES },
    { type: "account-management", title: "Account Management", path: PATH.USER.ACCOUNT_MANAGEMENT },
    { type: "my-payments", title: "My payments", path: PATH.USER.MY_PAYMENTS },
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
              as={Link}
              href={section.path}
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
      {children}
    </div>
  )
}
