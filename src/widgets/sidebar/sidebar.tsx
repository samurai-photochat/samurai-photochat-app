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
} from "@/shared/assets/icons/components"
import { Button } from "@/shared/ui"
import s from "./sidebar.module.scss"
import { useLogoutMutation } from "@/features/auth/api/authApi"
import { PATH } from "@/shared/config/routes"
import { Breakpoints, useBreakpoint } from "@/shared/hooks/useBreakpoint"
import { PostSettingModal } from "@/features/posts/ui/StepsCreatePost/PostSettingModal"
import { useState } from "react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/features/auth/model/authSlice"
import { SidebarItem } from "./sidebarItem"
import { ModalWindow } from "@/shared/ui/ModalWindow"

export default function Sidebar() {
  const [logoutUser, { isLoading }] = useLogoutMutation()

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
          <SidebarItem as="a" href={`${PATH.ROOT}`} variant="text" icon={<HomeIcon />} activeIcon={<HomeActive />}>
            Feed
          </SidebarItem>
        </li>
        <li className={s.item}>
          <SidebarItem
            onClick={() => {
              setIsOpenPostSettingModal(true)
            }}
            href={`${PATH.USER.FAVORITES}`}
            variant="text"
            active={isOpenPostSettingModal}
            icon={<PlusSquareIcon />}
            activeIcon={<PlusSquareActive />}
          >
            Create
          </SidebarItem>
        </li>
        <li className={s.item}>
          <SidebarItem
            as="a"
            href={`${PATH.USER.PROFILE}/${user?.userId}`}
            variant="text"
            icon={<PersonIcon />}
            activeIcon={<PersonActive />}
          >
            My Profile
          </SidebarItem>
        </li>
        <li className={s.item}>
          <SidebarItem
            as="a"
            href={`${PATH.USER.MESSENGER}`}
            variant="text"
            icon={<MessageCircleIcon />}
            activeIcon={<MessageActive />}
          >
            Messenger
          </SidebarItem>
        </li>
        <li className={s.item}>
          <SidebarItem
            as="a"
            href={`${PATH.USER.SEARCH}`}
            variant="text"
            icon={<SearchIcon />}
            activeIcon={<SearchIcon />}
          >
            Search
          </SidebarItem>
        </li>
        {!isNarrow && (
          <>
            <li className={s.item}>
              <SidebarItem
                as="a"
                href={`${PATH.USER.STATISTICS}`}
                variant="text"
                icon={<TrendingUpIcon />}
                activeIcon={<TrendingActive />}
              >
                Statistics
              </SidebarItem>
            </li>
            <li className={s.item}>
              <SidebarItem
                as="a"
                href={`${PATH.USER.FAVORITES}`}
                variant="text"
                icon={<BookmarkIcon />}
                activeIcon={<BookmarkActive />}
              >
                Favorites
              </SidebarItem>
            </li>
            <li className={s.item}>
              <Button variant="text" className={s.sidebarBtn} onClick={() => setIsOpenLogoutModal(true)}>
                <LogOutIcon />
                Log Out
              </Button>
              {/* <SidebarItem
                onClick={() => setIsOpenLogoutModal(true)}
                href={`${PATH.USER.FAVORITES}`}
                variant="text"
                className={s.sidebarBtn}
                active={isOpenLogoutModal}
                icon={<LogOutIcon />}
                activeIcon={<LogOutActive />}
              >
                Log Out
              </SidebarItem> */}
            </li>
          </>
        )}
      </ul>
      <PostSettingModal
        isOpenPostSettingModal={isOpenPostSettingModal}
        setIsOpenPostSettingModalAction={setIsOpenPostSettingModal}
      />
      <ModalWindow
        title={"Log Out"}
        open={isOpenLogoutModal}
        onClose={onCloseLogoutModal}
        description={
          <span>
            Are you sure you want to log out of your account &ldquo;<strong>{user.email}</strong>&rdquo;?
          </span>
        }
        buttonsContent={{
          buttons: [
            { title: "Yes", onClick: logoutHandler, disabled: isLoading },
            { title: "No", onClick: onCloseLogoutModal },
          ],
          className: s.modalButtons,
        }}
      />
    </div>
  )
}
