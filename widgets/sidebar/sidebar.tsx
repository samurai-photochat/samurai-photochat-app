import React from "react"
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

export default function Sidebar() {
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
          <Button variant="text" className={s.sidebarBtn}>
            <LogOutIcon />
            Log Out
          </Button>
        </li>
      </ul>
    </div>
  )
}
