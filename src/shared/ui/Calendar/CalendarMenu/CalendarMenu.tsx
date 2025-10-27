import s from "@/shared/ui/Calendar/CalendarMenu/CalendarMenu.module.scss"
import { ChevronLeft } from "@/shared/assets/icons/components/ChevronLeft"
import { ChevronRight } from "@/shared/assets/icons/components/ChevronRight"
import { SelectDayMenuContent, SelectYearMenuContent, useCalendarContext } from "@/shared/ui/Calendar"
import { useRef, useState } from "react"
import { useOutsideClick } from "@/shared/hooks/useOutsideClick"

export const CalendarMenu = () => {
  const { month, year, setMenuType, setMonth, setYear, menuType, setIsOpen } = useCalendarContext()
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const [prevDays, setPrevDays] = useState<number[]>([])
  const [days, setDays] = useState<number[]>([])
  const [nextDays, setNextDays] = useState<number[]>([])
  const ref = useRef<HTMLDivElement | null>(null)

  useOutsideClick({
    ref,
    action: () => {
      setMenuType("day")
      setIsOpen(false)
    },
  })

  const getCurrentMenu = () => {
    switch (menuType) {
      case "day":
        return (
          <SelectDayMenuContent
            days={days}
            setDaysOfMonth={setDaysOfMonth}
            nextDays={nextDays}
            prevDays={prevDays}
            nextMonthHandler={nextMonthHandler}
            prevMonthHandler={prevMonthHandler}
          />
        )
      case "year":
        return <SelectYearMenuContent />
    }
  }

  const setDaysOfMonth = () => {
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate()
    const prevDaysArray = []
    const daysArray = []
    const numberOfDays = new Date(year, month + 1, 0).getDate()
    const lastDayOfMonth = new Date(year, month + 1, 0).getDay()
    const nextDaysArray = []

    for (let i = 0; i < (new Date(year, month, 1).getDay() + 6) % 7; i++) {
      prevDaysArray.unshift(lastDayOfPrevMonth - i)
    }

    for (let i = 1; i <= numberOfDays; i++) {
      daysArray.push(i)
    }

    for (let i = 6 - ((lastDayOfMonth + 6) % 7); i > 0; i--) {
      nextDaysArray.unshift(i)
    }
    setPrevDays(prevDaysArray)
    setDays(daysArray)
    setNextDays(nextDaysArray)
  }

  const prevMonthHandler = () => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else setMonth(month - 1)
    setDaysOfMonth()
  }

  const nextMonthHandler = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else setMonth(month + 1)
    setDaysOfMonth()
  }
  return (
    <div className={s.menu} ref={ref}>
      <div className={s.header}>
        <button type={"button"} className={s.monthAndYear} onClick={() => setMenuType("year")}>
          {monthNames[month] + " " + year}
        </button>
        {menuType === "day" && (
          <div className={s.arrows}>
            <button type={"button"} className={s.arrow} onClick={prevMonthHandler}>
              <ChevronLeft />
            </button>
            <button type={"button"} className={s.arrow} onClick={nextMonthHandler}>
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
      {getCurrentMenu()}
    </div>
  )
}
