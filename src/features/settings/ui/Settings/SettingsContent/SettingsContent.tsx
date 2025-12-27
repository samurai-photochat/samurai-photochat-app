import { SettingsSectionType } from "@/features/settings/ui/Settings/types"
import { GeneralInformation } from "@/features/settings/ui/Settings/SettingsContent/GeneralInformation"
import { MyPayments } from "@/features/settings/ui/Settings/SettingsContent/MyPayments/MyPayments"

type Props = {
  sectionType: SettingsSectionType
}

export const SettingsContent = ({ sectionType }: Props) => {
  switch (sectionType) {
    case "general-information":
      return <GeneralInformation />
    case "my-payments":
      return <MyPayments />
    default:
      return <div></div>
  }
}
