import { AuthSessionProvider } from "@/app/providers/session-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <AuthSessionProvider>{children}</AuthSessionProvider>
}
