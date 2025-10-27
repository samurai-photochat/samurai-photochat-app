import { TextFieldProps } from "@/shared/ui/TextField"
import { CalendarContextProvider } from "@/shared/ui/Calendar"
import { CalendarBody } from "@/shared/ui/Calendar"

export type CalendarProps = {
  label: string
  onChange: (value: string) => void
  value: string
} & TextFieldProps

export const Calendar = ({ label, value, onChange, errorMessage = "" }: CalendarProps) => {
  return (
    <CalendarContextProvider errorMessage={errorMessage} label={label} value={value} onChange={onChange}>
      <CalendarBody />
    </CalendarContextProvider>
  )
}
