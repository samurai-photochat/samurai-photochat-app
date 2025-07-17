"use client"
import { signIn } from "next-auth/react"
//Временная зашлушка, нужно сделать отдельный компонент.
export default function LoginPage() {
  return (
    <div>
      <p>Login</p>
      <input type="text" onChange={(e) => console.log(e)} />
      <p>Password</p>
      <input type="text" onChange={(e) => console.log(e)} />
      <button>Войти</button>
      <button onClick={() => signIn("google")}>Войти через Google</button>
      <button onClick={() => signIn("github")}>Войти через GitHub</button>
    </div>
  )
}
