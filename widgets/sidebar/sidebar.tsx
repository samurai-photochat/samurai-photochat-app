"use client"
import {
  SearchIcon,
  HomeIcon,
  PlusSquareIcon,
  PersonIcon,
  MessageCircleIcon,
  TrendingUpIcon,
  BookmarkIcon,
  LogOutIcon,
} from "@/shared/assets/icons/components"
import { useState } from "react"
import { ModalWindow } from "@/features/auth/ui/Register/ModalWindow/ModalWindow"
import { Button } from "@/shared/ui"
import s from "./sidebar.module.css"
import { useLogoutMutation, useMeQuery } from "@/features/auth/api/authApi"
import LocalStorage from "@/shared/utils/localStorage/localStorage"
import { useAppDispatch } from "@/app/hooks/useAppDispatch"
import { setAppError } from "@/app/model/appSlice"
import { PATH } from "@/shared/config/routes"
import { Breakpoints, useBreakpoint } from "@/shared/hooks/useBreakpoint"

export default function Sidebar() {
  const [logoutUser] = useLogoutMutation()
  const { refetch, data: user } = useMeQuery()

  const [isModalClose, setIsModalClose] = useState<boolean>(true)

  const dispatch = useAppDispatch()
  const isNarrow = useBreakpoint(Breakpoints.narrow)

  const logoutHandler = () => {
    logoutUser()
      .unwrap()
      .then(() => {
        LocalStorage.removeToken()
        refetch()
      })
      .catch((err) => {
        dispatch(setAppError(err?.data?.messages?.[0]?.message || "Ошибка при выходе из аккаунта"))
      })
  }

  const modalCloseHandler = () => {
    logoutHandler()
    setIsModalClose(true)
  }

  return (
<<<<<<< HEAD
    <>
      <ModalWindow
        isOpen={isModalClose}
        title={""}
        text={`Are you really want to log out of your account "___email___"?`}
        isClose={modalCloseHandler}
      />

      <div className={`${s.sidebar} regular-text-14`}>
        <ul className={s.list}>
          <li className={s.item}>
            <Button variant="text" className={s.sidebarBtn}>
              <HomeIcon />
              Feed
            </Button>
          </li>
          <li className={s.item}>
            <Button variant="text" className={s.sidebarBtn}>
              <PlusSquareIcon /> Create
            </Button>
          </li>
          <li className={s.item}>
            <Button variant="text" as="a" href={`${PATH.USER.PROFILE}/${user?.userId}`} className={s.sidebarBtn}>
              <PersonIcon />
              My Profile
            </Button>
          </li>
          <li className={s.item}>
            <Button variant="text" className={s.sidebarBtn}>
              <MessageCircleIcon />
              Messenger
            </Button>
          </li>
          <li className={s.item}>
            <Button variant="text" className={s.sidebarBtn}>
              <SearchIcon />
              Search
            </Button>
          </li>
          <li className={s.item}>
            <Button variant="text" className={s.sidebarBtn}>
              <TrendingUpIcon />
              Statistics
            </Button>
          </li>
          <li className={s.item}>
            <Button variant="text" className={s.sidebarBtn}>
              <BookmarkIcon />
              Favorites
            </Button>
          </li>
          <li className={s.item}>
            <Button variant="text" className={s.sidebarBtn} onClick={() => setIsModalClose(false)}>
              <LogOutIcon />
              Log Out
            </Button>
          </li>
        </ul>
      </div>
    </>
=======
    <div className={`${s.sidebar} regular-text-14`}>
      <ul className={s.list}>
        <li className={s.item}>
          <Button variant="text" className={s.sidebarBtn}>
            <HomeIcon />
            Feed
          </Button>
        </li>
        <li className={s.item}>
          <Button variant="text" className={s.sidebarBtn}>
            <PlusSquareIcon /> Create
          </Button>
        </li>
        <li className={s.item}>
          <Button variant="text" as="a" href={`${PATH.USER.PROFILE}/${user?.userId}`} className={s.sidebarBtn}>
            <PersonIcon />
            My Profile
          </Button>
        </li>
        <li className={s.item}>
          <Button variant="text" className={s.sidebarBtn}>
            <MessageCircleIcon />
            Messenger
          </Button>
        </li>
        <li className={s.item}>
          <Button variant="text" className={s.sidebarBtn}>
            <SearchIcon />
            Search
          </Button>
        </li>
        {!isNarrow && (
          <>
            <li className={s.item}>
              <Button variant="text" className={s.sidebarBtn}>
                <TrendingUpIcon />
                Statistics
              </Button>
            </li>
            <li className={s.item}>
              <Button variant="text" className={s.sidebarBtn}>
                <BookmarkIcon />
                Favorites
              </Button>
            </li>
            <li className={s.item}>
              <Button variant="text" className={s.sidebarBtn} onClick={logoutHandler}>
                <LogOutIcon />
                Log Out
              </Button>
            </li>
          </>
        )}
      </ul>
    </div>
>>>>>>> origin/dev
  )
}
