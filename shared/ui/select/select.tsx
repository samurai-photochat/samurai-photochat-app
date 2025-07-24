"use client"

import React from "react"
import * as Select from "@radix-ui/react-select"
import Image from "next/image"

import RussianFlag from "@/shared/assets/svg/flagRussia.svg"
import UKFlag from "@/shared/assets/svg/flagEngland.svg"
import arrowDown from "@/shared/assets/svg/arrowDown.svg"
import checkmark from "@/shared/assets/svg/checkmark.svg"
import style from "./select.module.css"

const countries = {
  Russian: RussianFlag,
  English: UKFlag,
} as const

type CountryCode = keyof typeof countries

export default function SelectCountry() {
  const [value, setValue] = React.useState<CountryCode>("Russian")
  console.log("Выбранная страна:", value)

  return (
    <Select.Root value={value} onValueChange={(val) => setValue(val as CountryCode)}>
      <Select.Trigger className={style.selectTrigger} aria-label={value}>
        <Image src={countries[value].src} alt={value} width={20} height={20} className={style.flagIcon} />
        {value}
        <Select.Icon>
          <Image src={arrowDown.src} alt="bell" width={24} height={24} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={style.selectContent} position="popper">
          <Select.Viewport className={style.selectViewport}>
            {Object.entries(countries).map(([code, flag]) => (
              <Select.Item key={code} value={code} className={style.selectItem}>
                <Select.ItemText>
                  <Image src={flag.src} alt={code} width={20} height={20} className={style.flagIcon} />
                  {code.replace("-", " ")}
                </Select.ItemText>
                <Select.ItemIndicator className={style.selectIndicator}>
                  <Image src={checkmark.src} alt="bell" width={24} height={24} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
