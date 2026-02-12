import { PaymentsTable } from "@/features/settings/ui/Settings/SettingsContent/MyPayments/PaymentsTable"
import { useGetMyPaymentsQuery } from "@/features/settings/api/subscriptionsApi"

export const MyPayments = () => {
  const { data, isLoading } = useGetMyPaymentsQuery()
  return <PaymentsTable payments={data!} isLoading={isLoading}></PaymentsTable>
}
