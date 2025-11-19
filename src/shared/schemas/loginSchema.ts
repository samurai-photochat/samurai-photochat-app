import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email format").nonempty({ message: "Email is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
})

export type LoginInputs = z.infer<typeof loginSchema>
