import { createContext, useContext } from "react"
import { RadioGroupContextType } from "./RadioGroup.types"

export const RadioGroupContext = createContext<RadioGroupContextType | null>(null)

export const useRadioGroup = () => {
  const context = useContext(RadioGroupContext)
  if (!context) throw new Error("RadioButton must be used within RadioGroup")
  return context
}
