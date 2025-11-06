import { z } from "zod"

const compareDates = (date1: Date, date2: Date) => {
  if (date1.getFullYear() === date2.getFullYear()) {
    if (date1.getMonth() === date2.getMonth()) {
      return date1.getDate() <= date2.getDate()
    } else return date1.getMonth() < date2.getMonth()
  } else return date1.getFullYear() < date2.getFullYear()
}

export const userSchema = z.object({
  userName: z
    .string()
    .min(1, "Username is required")
    .regex(/^[-_A-Za-z0-9]+$/, "Username must contain only numbers, latin letters, - and _ symbols")
    .min(6, "Minimum number of characters 6")
    .max(30, "Maximum number of characters 30"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .regex(/^[A-Za-zА-Яа-я]+$/, "First name must contain only latin and russian letters")
    .max(50, "Maximum number of characters 50"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[A-Za-zА-Яа-я]+$/, "Last name must contain only latin and russian letters")
    .max(50, "Maximum number of characters 50"),
  dateOfBirth: z.string().refine(
    (date) => {
      if (date) {
        const today = new Date()
        const thirteenDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate())
        const dateInfo = date.split("-")
        const currentDate = new Date(Number(dateInfo[0]), Number(dateInfo[1]) - 1, Number(dateInfo[2].slice(0, 2)))
        return compareDates(currentDate, thirteenDate)
      } else return true
    },
    { message: "A user under 13 cannot create a profile" }
  ),
  country: z.string(),
  city: z.string(),
  aboutMe: z.string().max(200, "Maximum number of characters 200"),
})

export type UserInputs = z.infer<typeof userSchema>
