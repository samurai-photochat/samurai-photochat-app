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
import { Button } from "@/shared/ui"
import s from "./sidebar.module.css"
import { useLogoutMutation, useMeQuery } from "@/features/auth/api/authApi"
import LocalStorage from "@/shared/utils/localStorage/localStorage"
import { useAppDispatch } from "@/app/hooks/useAppDispatch"
import { setAppError } from "@/app/model/appSlice"

export default function Sidebar() {
  const [logoutUser] = useLogoutMutation()
  const { refetch } = useMeQuery()

  const dispatch = useAppDispatch()

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

  return (
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
          <Button variant="text" as="a" href="#" className={s.sidebarBtn}>
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
          <Button variant="text" className={s.sidebarBtn} onClick={logoutHandler}>
            <LogOutIcon />
            Log Out
          </Button>
        </li>
      </ul>
    </div>
  )
}
