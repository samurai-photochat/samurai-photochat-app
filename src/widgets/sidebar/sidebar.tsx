"use client"
import {
  SearchIcon,
  HomeIcon,
  HomeActive,
  PlusSquareIcon,
  PlusSquareActive,
  PersonIcon,
  PersonActive,
  MessageCircleIcon,
  MessageActive,
  TrendingUpIcon,
  BookmarkIcon,
  BookmarkActive,
  LogOutIcon,
  TrendingActive,
  LogOutActive,
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
import { Modal } from "@/shared/ui/modal/Modal"
import { LogoutContent } from "@/features/auth/ui/Logout/LogoutContent"
import { SidebarItem } from "./sidebarItem"

export default function Sidebar() {
  const [logoutUser] = useLogoutMutation()

  const [isOpenPostSettingModal, setIsOpenPostSettingModal] = useState<boolean>(false)
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState<boolean>(false)
  const isNarrow = useBreakpoint(Breakpoints.narrow)

  const logoutHandler = async () => {
    await logoutUser()
    window.location.href = PATH.AUTH.LOGOUT
  }

  const onCloseLogoutModal = () => {
    setIsOpenLogoutModal(false)
  }

  const user = useSelector(selectCurrentUser)

  if (!user) {
    return null
  }

  return (
    <div className={`${s.sidebar} regular-text-14`}>
      <ul className={s.list}>
        <li className={s.item}>
          {/* <Button as="a" href={`${PATH.ROOT}`} variant="text" className={s.sidebarBtn}>
            <HomeIcon />
            Feed
          </Button> */}
          <SidebarItem
            as="a"
            href={`${PATH.ROOT}`}
            variant="text"
            className={s.sidebarBtn}
            icon={<HomeIcon />}
            activeIcon={<HomeActive />}
          >
            Feed
          </SidebarItem>
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

          {/* <SidebarItem
            onClick={() => {
              setIsOpenPostSettingModal(true)
            }}
            href={`${PATH.USER.FAVORITES}`}
            variant="text"
            className={s.sidebarBtn}
            active={isOpenPostSettingModal}
            icon={<PlusSquareIcon />}
            activeIcon={<PlusSquareActive />}
          >
            Create
          </SidebarItem> */}
        </li>
        <li className={s.item}>
          {/* <Button variant="text" as="a" href={`${PATH.USER.PROFILE}/${user?.userId}`} className={s.sidebarBtn}>
            <PersonIcon />
            My Profile
          </Button> */}
          <SidebarItem
            as="a"
            href={`${PATH.USER.PROFILE}/${user?.userId}`}
            variant="text"
            className={s.sidebarBtn}
            icon={<PersonIcon />}
            activeIcon={<PersonActive />}
          >
            My Profile
          </SidebarItem>
        </li>
        <li className={s.item}>
          {/* <Button variant="text" as="a" href={`${PATH.USER.MESSENGER}`} className={s.sidebarBtn}>
            <MessageCircleIcon />
            Messenger
          </Button> */}
          <SidebarItem
            as="a"
            href={`${PATH.USER.MESSENGER}`}
            variant="text"
            className={s.sidebarBtn}
            icon={<MessageCircleIcon />}
            activeIcon={<MessageActive />}
          >
            Messenger
          </SidebarItem>
        </li>
        <li className={s.item}>
          {/* <Button variant="text" as="a" href={`${PATH.USER.SEARCH}`} className={s.sidebarBtn}>
            <SearchIcon />
            Search
          </Button> */}
          <SidebarItem
            as="a"
            href={`${PATH.USER.SEARCH}`}
            variant="text"
            className={s.sidebarBtn}
            icon={<SearchIcon />}
            activeIcon={<SearchIcon />}
          >
            Search
          </SidebarItem>
        </li>
        {!isNarrow && (
          <>
            <li className={s.item}>
              {/* <Button variant="text" as="a" href={`${PATH.USER.STATISTICS}`} className={s.sidebarBtn}>
                <TrendingUpIcon />
                Statistics
              </Button> */}
              <SidebarItem
                as="a"
                href={`${PATH.USER.STATISTICS}`}
                variant="text"
                className={s.sidebarBtn}
                icon={<TrendingUpIcon />}
                activeIcon={<TrendingActive />}
              >
                Statistics
              </SidebarItem>
            </li>
            <li className={s.item}>
              {/* <Button variant="text" as="a" href={`${PATH.USER.FAVORITES}`} className={s.sidebarBtn}>
                <BookmarkIcon />
                Favorites
              </Button> */}
              <SidebarItem
                as="a"
                href={`${PATH.USER.FAVORITES}`}
                variant="text"
                className={s.sidebarBtn}
                icon={<BookmarkIcon />}
                activeIcon={<BookmarkActive />}
              >
                Favorites
              </SidebarItem>
            </li>
            <li className={s.item}>
              {/* <Button variant="text" className={s.sidebarBtn} onClick={() => setIsOpenLogoutModal(true)}>
                <LogOutIcon />
                Log Out
              </Button> */}
              <SidebarItem
                onClick={() => setIsOpenLogoutModal(true)}
                href={`${PATH.USER.FAVORITES}`}
                variant="text"
                className={s.sidebarBtn}
                active={isOpenLogoutModal}
                icon={<LogOutIcon />}
                activeIcon={<LogOutActive />}
              >
                Log Out
              </SidebarItem>
            </li>
          </>
        )}
      </ul>
      <PostSettingModal
        isOpenPostSettingModal={isOpenPostSettingModal}
        setIsOpenPostSettingModalAction={setIsOpenPostSettingModal}
      />
      <Modal open={isOpenLogoutModal} onClose={onCloseLogoutModal} email={user.email}>
        <LogoutContent onClose={onCloseLogoutModal} logoutHandler={logoutHandler} />
      </Modal>
    </div>
  )
}
