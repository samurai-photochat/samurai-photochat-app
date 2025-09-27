"use client"
import React from "react"
import s from "./header.module.css"
import SelectCountry from "@/shared/ui/select/select"
import Button from "@/shared/ui/button/button"
import { useMeQuery } from "@/features/auth/api/authApi"
import { PATH } from "@/shared/config/routes"

const Path = {
  login: PATH.AUTH.LOGIN,
  Signup: PATH.AUTH.REGISTRATION,
}

export const Header = () => {
  // const dispatch = useAppDispatch()
  //использование useAppSelector можно только на клиентских компонентах
  // const isLoggendIn = useAppSelector(selectIsLoggedIn)
  // При необходмости вытащить параметр из Store используем selector напрямую(стока ниже!!!)
  const { data: user, isError } = useMeQuery()
  const isLoggedIn = !!user && !isError

  return (
    <header className={s.header}>
      <h1 className={s.logoText}>Inctagram</h1>

      {/* <p className={s.bell}>
        <Image src={outlineBell.src} alt="bell" width={24} height={24} />
      </p> */}
      <p>
        <SelectCountry />
      </p>
      {!isLoggedIn && (
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
