import { AuthSessionProvider } from "@/app/providers/session-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Оборачиваем в AuthSessionProvider:
          - обеспечивает работу useSession() - поддерживает signIn/signOut() (next-auth)*/}
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  )
}
