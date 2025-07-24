import React from "react"
import style from "./header.module.css"
import SelectCountry from "@/shared/ui/select/select"
import Image from "next/image"
import outlineBell from "@/shared/assets/svg/outlineBell.svg"

export const Header = () => {
  return (
    <header className={style.header}>
      <h1 className={style.logoText}>Inctagram</h1>

      <p className={style.bell}>
        <Image src={outlineBell.src} alt="bell" width={24} height={24} />
      </p>
      <p>
        <SelectCountry />
      </p>
    </header>
  )
}
