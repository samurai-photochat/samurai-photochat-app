export type SettingsSection = {
  type: SettingsSectionType
  title: string
}

export type SettingsSectionType = "general-information" | "devices" | "account-management" | "my-payments"
