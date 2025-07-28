import { ReactNode } from "react"
import s from "./AgreementContent.module.css"
import Button from "@/shared/ui/button/button"

type Props = {
  title: string
  children?: ReactNode
}

export const AgreementContent = ({ title, children }: Props) => {
  return (
    <div className={s.page}>
      <Button as="a" href={"/auth/signup"} className={s.button} variant="text">
        Back to Sign Up
      </Button>
      <main className={s.main}>
        <h1 className={s.title}>{title}</h1>
        <text className={s.text}>{children}</text>
      </main>
    </div>
  )
}
