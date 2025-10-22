import { Suspense } from "react"
import { SignUpContent } from "@/widgets/auth/ui"

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpContent />
    </Suspense>
  )
}
