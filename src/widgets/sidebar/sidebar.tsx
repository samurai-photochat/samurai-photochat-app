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
import { PATH } from "@/shared/config/routes"
import { Breakpoints, useBreakpoint } from "@/shared/hooks/useBreakpoint"
import { PostSettingModal } from "@/features/posts/ui/StepsCreatePost/PostSettingModal"
import { useState } from "react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/features/auth/model/authSlice"

export default function Sidebar() {
  const [logoutUser] = useLogoutMutation()

  const [isOpenPostSettingModal, setIsOpenPostSettingModal] = useState<boolean>(false)
  const isNarrow = useBreakpoint(Breakpoints.narrow)

  const logoutHandler = async () => {
    await logoutUser()
    window.location.href = PATH.AUTH.LOGOUT
  }

  const user = useSelector(selectCurrentUser)

  if (!user) {
    return null
  }
  return (
    <div className={`${s.sidebar} regular-text-14`}>
      <ul className={s.list}>
        <li className={s.item}>
          <Button as="a" href={`${PATH.ROOT}`} variant="text" className={s.sidebarBtn}>
            <HomeIcon />
            Feed
          </Button>
        </li>
        <li className={s.item}>
          <Button
            variant="text"
            className={s.sidebarBtn}
            onClick={() => {
              setIsOpenPostSettingModal(true)
            }}
          >
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
      <PostSettingModal
        isOpenPostSettingModal={isOpenPostSettingModal}
        setIsOpenPostSettingModalAction={setIsOpenPostSettingModal}
      />
    </div>
  )
}
