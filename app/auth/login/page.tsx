import s from "./page.module.css"
import { Form } from "radix-ui"
import Image from "next/image"
import googleIcon from "@/shared/assets/img/google-icon.png"
import githubIcon from "@/shared/assets/img/github-icon.png"
import { Button } from "@radix-ui/themes"
import * as React from "react"

export default function LoginPage() {
  const providers = [
    { name: "Google", icon: googleIcon, href: "" },
    { name: "GitHub", icon: githubIcon, href: "" },
  ]
  const fields = [
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
  ]
  return (
    <div className={s.page}>
      <Form.Root className={s.form}>
        <h1 className={s.h1}>Sign In</h1>
        <div className={s.iconRow}>
          {providers.map(({ name, icon, href }) => (
            <a key={name} href={href}>
              <Image src={icon} alt={name} />
            </a>
          ))}
        </div>
        {fields.map(({ name, label, type = "text", required = false }) => (
          <Form.Field key={name} className={s.field} name={name}>
            <Form.Label className={s.label}>{label}</Form.Label>
            <Form.Control asChild>
              <input className={s.input} type={type} required={required} />
            </Form.Control>
            <Form.Message className={s.message} match={"valueMissing"}>
              The {name} is required
            </Form.Message>
          </Form.Field>
        ))}
        <span className={s.span}>
          <a href={""} className={`${s.span} ${s.grayText} ${s.a}`}>
            Forgot Password
          </a>
        </span>
        <Button type={"submit"} className={s.button} variant={"classic"}>
          Sign In
        </Button>
        <span className={s.whiteText}>{`Don't have an account?`}</span>
        <a className={`${s.a} ${s.blueText}`} href={""}>
          Sign Up
        </a>
      </Form.Root>
    </div>
  )
}
