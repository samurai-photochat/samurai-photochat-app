import { AccountManagement } from "@/features/settings/ui/Settings/SettingsContent/AccountManagement"
import { Suspense } from "react"

export const AccountManagementPage = () => {
  return (
    <Suspense fallback={<div>Loading search bar...</div>}>
      <AccountManagement />
    </Suspense>
  )
}
