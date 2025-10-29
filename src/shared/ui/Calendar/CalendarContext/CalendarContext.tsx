import { createContext, ReactNode, useContext, useMemo, useState } from "react"

type CalendarMenuType = "day" | "year"

type CalendarContextValue = {
  month: number
  setMonth: (month: number) => void
  year: number
  setYear: (year: number) => void
  menuType: CalendarMenuType
  setMenuType: (menuType: CalendarMenuType) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onChange: (value: string) => void
  label: string
  value: string
  errorMessage: string
}

type CalendarProviderProps = {
  onChange: (value: string) => void
  value: string
  label: string
  children: ReactNode
  errorMessage: string
}

const CalendarContext = createContext<CalendarContextValue | null>(null)

export const useCalendarContext = () => {
  const context = useContext(CalendarContext)
  if (!context) {
    throw new Error("useCalendarContext must be used within CalendarContextProvider")
  }

  return context
}

export const CalendarContextProvider = ({ label, value, onChange, errorMessage, children }: CalendarProviderProps) => {
  const currentDate = new Date()
  const [month, setMonth] = useState<number>(currentDate.getMonth())
  const [year, setYear] = useState<number>(currentDate.getFullYear())
  const [menuType, setMenuType] = useState<CalendarMenuType>("day")
  const [isOpen, setIsOpen] = useState(false)
  const contextValue = useMemo<CalendarContextValue>(
    () => ({
      month,
      setMonth,
      year,
      setYear,
      menuType,
      setMenuType,
      isOpen,
      setIsOpen,
      onChange,
      value,
      label,
      errorMessage,
    }),
    [errorMessage, isOpen, label, menuType, month, onChange, value, year]
  )
  return <CalendarContext.Provider value={contextValue}>{children}</CalendarContext.Provider>
}
