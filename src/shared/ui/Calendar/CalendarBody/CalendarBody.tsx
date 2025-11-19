import { TextField } from "@/shared/ui/TextField"
import { useCalendarContext } from "@/shared/ui/Calendar"
import { CalendarOutline } from "@/shared/assets/icons/components/CalendarOutline"
import { CalendarIcon } from "@/shared/assets/icons/components/CalendarIcon"
import { CalendarMenu } from "@/shared/ui/Calendar/CalendarMenu/CalendarMenu"

export const CalendarBody = () => {
  const { setMenuType, isOpen, setIsOpen, label, value, errorMessage } = useCalendarContext()

  const handleClick = () => {
    setMenuType("day")
    setIsOpen(!isOpen)
  }

  return (
    <div style={{ color: errorMessage ? "var(--color-danger-500" : "" }}>
      <TextField
        value={(value && new Date(value).toLocaleDateString()) || value}
        label={label}
        readOnly
        type={"text"}
        endIcon={<div onClick={handleClick}>{isOpen ? <CalendarIcon /> : <CalendarOutline />}</div>}
        style={{ cursor: "pointer", color: errorMessage ? "var(--color-danger-500" : "" }}
        errorMessage={errorMessage}
      />
      {isOpen && <CalendarMenu />}
    </div>
  )
}
