import { SettingsSectionType } from "@/features/settings/ui/Settings/types"
import { GeneralInformation } from "@/features/settings/ui/Settings/SettingsContent/GeneralInformation"
import { AccountManagement } from "@/features/settings/ui/Settings/SettingsContent/AccountManagement/AccountManagement"

type Props = {
  sectionType: SettingsSectionType
}

export const SettingsContent = ({ sectionType }: Props) => {
  switch (sectionType) {
    case "general-information":
      return <GeneralInformation />
    case "account-management":
      return <AccountManagement />
    default:
      return <div></div>
  }
}
