import { Form } from "radix-ui"
import s from "./page.module.css"
import * as React from "react"
import Image from "next/image"
import googleIcon from "./google-icon.png"
import gitHubIcon from "./github-icon.png"
import { Button } from "@radix-ui/themes"

export default function RegistrationPage() {
  return (
    <div className={s.page}>
      <Form.Root className={s.form}>
        <h1
          style={{
            color: "var(--color-light-100)",
            textAlign: "center",
            fontSize: "var(--text-xl)",
            marginBottom: "13px",
          }}
        >
          Sign Up
        </h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "60px" }}>
          <a href={""} className={s.icon}>
            <Image src={googleIcon} alt={"google-icon"} />
          </a>
          <a href={""} className={s.icon}>
            <Image src={gitHubIcon} alt={"github-icon"} />
          </a>
        </div>
        <Form.Field className={s.field} name="username">
          <Form.Label className={s.label}>Username</Form.Label>
          <Form.Control asChild>
            <input className={s.input} type="username" required />
          </Form.Control>
          <Form.Message className={s.message} match="valueMissing">
            The username is required
          </Form.Message>
        </Form.Field>
        <Form.Field className={s.field} name="email">
          <Form.Label className={s.label}>Email</Form.Label>
          <Form.Control asChild>
            <input className={s.input} type="email" required />
          </Form.Control>
          <Form.Message className={s.message} match="valueMissing">
            The email address is required
          </Form.Message>
        </Form.Field>
        <Form.Field className={s.field} name="password">
          <Form.Label className={s.label}>Password</Form.Label>
          <Form.Control asChild>
            <input className={s.input} type="password" required />
          </Form.Control>
          <Form.Message className={s.message} match="valueMissing">
            The password is required
          </Form.Message>
        </Form.Field>
        <Form.Field className={s.field} name="password_confirmation">
          <Form.Label className={s.label}>Password confirmation</Form.Label>
          <Form.Control asChild>
            <input className={s.input} type="password" required />
          </Form.Control>
          <Form.Message className={s.message} match="valueMissing">
            The password is required
          </Form.Message>
        </Form.Field>
        <Form.Field className={s.field} name="agree" style={{ flexDirection: "row" }}>
          <Form.Control asChild>
            <input type="checkbox" />
          </Form.Control>
          <Form.Label className={s.label} style={{ paddingLeft: "8px", fontSize: "var(--text-xs)" }}>
            I agree to the <a href={""}>Terms of Service</a> and <a href={""}>Privacy Policy</a>
          </Form.Label>
        </Form.Field>
        <Button style={{ width: "100%" }} type="submit" variant={"classic"} color={"red"}>
          Sign Up
        </Button>
        <span style={{ color: "var(--color-light-100)" }}>Do you have an account?</span>
        <a href={""}>Sign in</a>
      </Form.Root>
    </div>
  )
}
