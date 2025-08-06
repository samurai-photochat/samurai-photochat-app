import React from "react"
import s from "./profile.module.css"
import { Button } from "@/shared/ui"
import Image from "next/image"
import homeOut from "@/shared/assets/svg/home-outline.svg"
import { SearchIcon } from "@/shared/assets/icons/components"

export default function Profile() {
  return (
    <div className={s.profile}>
      <div className={s.sidebar}>
        <ul>
          <li className={s.item}>
            <Button className={s.sidebarBtn} variant="text">
              <Image className={s.icon} src={homeOut.src} alt="home" width={24} height={24} />
              Feed
            </Button>
          </li>
          <li className={s.item}>
            <Button variant="text">Create </Button>
          </li>
          <li className={s.item}>
            <Button variant="text">My Profile </Button>
          </li>
          <li className={s.item}>
            <Button variant="text">Messenger </Button>
          </li>
          <li className={s.item}>
            <Button className={s.sidebarBtn} variant="text">
              <SearchIcon />
              Search
            </Button>
          </li>
          <li className={s.item}>
            <Button variant="text"> Statistics</Button>
          </li>
          <li className={s.item}>
            <Button variant="text"> Search</Button>
          </li>
          <li className={s.item}>
            <Button variant="text"> Favorites</Button>
          </li>
          <li className={s.item}>
            <Button variant="text"> Log Out</Button>
          </li>
        </ul>
      </div>

      <div style={{ border: "1px solid red", width: "100%", textAlign: "center" }}>
        <h2>Content</h2>
      </div>
    </div>
  )
}
