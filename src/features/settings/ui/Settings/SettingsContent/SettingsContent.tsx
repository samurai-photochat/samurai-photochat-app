import { SettingsSectionType } from "@/features/settings/ui/Settings/types"
import { GeneralInformation } from "@/features/settings/ui/Settings/SettingsContent/GeneralInformation"

type Props = {
  sectionType: SettingsSectionType
}

export const SettingsContent = ({ sectionType }: Props) => {
  switch (sectionType) {
    case "general-information":
      return <GeneralInformation />
    default:
      return <div></div>
  }
}
