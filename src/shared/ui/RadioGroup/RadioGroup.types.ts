export type RadioOption = {
  value: string
  label: string
  disabled?: boolean
}

export type RadioGroupContextType = {
  selectedValue: string
  name: string
  onChange: (value: string) => void
  disabled?: boolean
}
