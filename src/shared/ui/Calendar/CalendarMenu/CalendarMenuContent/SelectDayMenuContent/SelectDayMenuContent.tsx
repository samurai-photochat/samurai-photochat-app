import s from "./SelectDayMenuContent.module.scss"
import { useCalendarContext } from "@/shared/ui/Calendar"
import { useEffect } from "react"

type Props = {
  setDaysOfMonth: () => void
  prevDays: number[]
  days: number[]
  nextDays: number[]
  prevMonthHandler: () => void
  nextMonthHandler: () => void
}
export const SelectDayMenuContent = ({
  setDaysOfMonth,
  prevDays,
  days,
  nextDays,
  prevMonthHandler,
  nextMonthHandler,
}: Props) => {
  const { month, year, setIsOpen, onChange } = useCalendarContext()
  const currentDate = new Date()

  useEffect(() => {
    setDaysOfMonth()
  }, [month])

  return (
    <>
      <div className={s.weekDays}>
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
        <span>Su</span>
      </div>
      <div className={s.monthDays}>
        {prevDays.map((value, i) => (
          <button key={i} type={"button"} onClick={prevMonthHandler}>
            {value}
          </button>
        ))}
        {days.map((value, i) => {
          const handleClick = () => {
            const newDate = new Date(year, month, value)
            onChange(newDate.toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" }))
            setIsOpen(false)
          }
          return (
            <button
              key={i}
              type={"button"}
              onClick={handleClick}
              className={
                s.dayOfCurrentMonth +
                ((value + prevDays.length - 1) % 7 > 4 ? " " + s.weekend : "") +
                (value === currentDate.getDate() &&
                month === currentDate.getMonth() &&
                year === currentDate.getFullYear()
                  ? " " + s.currentDay
                  : "")
              }
            >
              {value}
            </button>
          )
        })}
        {nextDays.map((day, i) => (
          <button type={"button"} key={i} onClick={nextMonthHandler}>
            {day}
          </button>
        ))}
      </div>
    </>
  )
}
