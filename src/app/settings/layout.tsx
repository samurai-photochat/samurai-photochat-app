import { ReactNode } from "react"
import { Settings } from "@/features/settings/ui"

type Props = {
  children: ReactNode
}
export default function SettingsLayout({ children }: Props) {
  return <Settings>{children}</Settings>
}
