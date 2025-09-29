"use client"
import React from "react"
import s from "./header.module.css"
import SelectCountry from "@/shared/ui/select/select"
import Button from "@/shared/ui/button/button"
import { useMeQuery } from "@/features/auth/api/authApi"
import { PATH } from "@/shared/config/routes"
import { Breakpoints, useBreakpoint } from "@/shared/hooks/useBreakpoint"
import { BookmarkIcon, LogOutIcon, TrendingUpIcon } from "@/shared/assets/icons/components"
import { DropdownMenu } from "@/shared/ui/DropdownMenu"
import { Settings } from "@/shared/assets/icons/components/Settings";
// import { selectIsLoggedIn } from "@/entities/user/userSlice"
// import { useAppDispatch } from "@/app/hooks/useAppDispatch"

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
  const isNarrow = useBreakpoint(Breakpoints.narrow)

  return (
    <header className={s.header}>
      <h1 className={s.logoText}>Inctagram</h1>

      {/* <p className={s.bell}>
        <Image src={outlineBell.src} alt="bell" width={24} height={24} />
      </p> */}
      <div className={s.controls}>
        <div className={s.selectWrapper}>
          <SelectCountry />
        </div>
        {isNarrow ? (
          <DropdownMenu align={"end"} sideOffset={6}>
            {isLoggedIn && (
              <Button as="a" className={s.menuButton}>
                <Settings />
                <span style={{ marginLeft: 8 }}>Profile Settings</span>
              </Button>
            )}
            <Button as="a" className={s.menuButton}>
              <TrendingUpIcon />
              <span style={{ marginLeft: 8 }}>Statistics</span>
            </Button>

            <Button as="a" className={s.menuButton}>
              <BookmarkIcon />
              <span style={{ marginLeft: 8 }}>Favorites</span>
            </Button>
            <Button className={s.menuButton}>
              <LogOutIcon />
              <span style={{ marginLeft: 8 }}>Log Out</span>
            </Button>
          </DropdownMenu>
        ) : (
          !isLoggedIn && (
            <div className={s.menuButton}>
              <Button as={"a"} href={Path.login} fullWidth variant="text" className={s.button}>
                Log in
              </Button>
              <Button className={s.button} as={"a"} href={Path.Signup} variant="primary">
                Sign up
              </Button>
            </div>
          )
        )}
      </div>
    </header>
  )
}
