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
import { useLogoutMutation } from "@/features/auth/api/authApi"
import { useAppDispatch } from "@/shared/hooks/useAppDispatch"
import { setAppError } from "@/app/model/appSlice"
import { clearToken, clearCurrentUser } from "@/features/auth/model/authSlice"
import LocalStorage from "@/shared/utils/localStorage/localStorage"
import { PATH } from "@/shared/config/routes"

export default function Sidebar() {
  const [logoutUser] = useLogoutMutation()
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap()
    } catch (error) {
      console.error("Server logout failed:", error)
    } finally {
      window.location.href = "/auth/login"
    }
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
          <Button variant="text" className={s.sidebarBtn} onClick={handleLogout}>
            <LogOutIcon />
            Log Out
          </Button>
        </li>
      </ul>
    </div>
  )
}
