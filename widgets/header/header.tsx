// "use client"
import React from "react"
import s from "./header.module.css"
import SelectCountry from "@/shared/ui/select/select"
// import Image from "next/image"
// import outlineBell from "@/shared/assets/svg/outlineBell.svg"
import Button from "@/shared/ui/button/button"
// import { useAppSelector } from "@/app/hooks/useAppSelector"
import { store } from "@/app/store/store"
// import { selectIsLoggedIn } from "@/entities/user/userSlice"
// import { useAppDispatch } from "@/app/hooks/useAppDispatch"

const Path = {
  login: "/auth/login",
  Signup: "/auth/signup",
}

export const Header = () => {
  // const dispatch = useAppDispatch()
  //использование useAppSelector можно только на клиентских компонентах
  // const isLoggendIn = useAppSelector(selectIsLoggedIn)
  // При необходмости вытащить параметр из Store используем selector напрямую(стока ниже!!!)
  const isLoggendIn = false

  return (
    <header className={s.header}>
      <h1 className={s.logoText}>Inctagram</h1>

      {/* <p className={s.bell}>
        <Image src={outlineBell.src} alt="bell" width={24} height={24} />
      </p> */}
      <p>
        <SelectCountry />
      </p>
      {!isLoggendIn && (
        <div className={s.menuButton}>
          <Button as={"a"} href={Path.login} fullWidth variant="text" className={s.button}>
            Log in
          </Button>
          <Button className={s.button} as={"a"} href={Path.Signup} variant="primary">
            Sign up
          </Button>
        </div>
      )}
    </header>
  )
}
