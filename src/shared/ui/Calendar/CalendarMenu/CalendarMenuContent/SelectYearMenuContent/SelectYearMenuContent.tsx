import s from "./SelectYearMenuContent.module.scss"
import { useCalendarContext } from "@/shared/ui/Calendar"
import { useEffect, useRef } from "react"

const getYears = () => {
  const array = []
  for (let i = 1900; i < 2100; ++i) array.push(i)
  return array
}

export const SelectYearMenuContent = () => {
  const { setMenuType, setYear, year } = useCalendarContext()
  const years = getYears()

  const currentYearRef = useRef<HTMLButtonElement>(null)

  const scrollToCurrentYear = () => {
    if (currentYearRef.current) {
      currentYearRef.current.scrollIntoView({
        behavior: "instant",
        block: "start",
      })
    }
  }

  useEffect(() => {
    scrollToCurrentYear()
  }, [])
  return (
    <div className={s.yearsGrid}>
      {years.map((value, i) => {
        const handleClick = () => {
          setYear(value)
          setMenuType("day")
        }
        return (
          <button ref={value === year ? currentYearRef : null} key={i} onClick={handleClick} className={s.year}>
            {value}
          </button>
        )
      })}
    </div>
  )
}
