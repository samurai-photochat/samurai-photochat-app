import z from "zod"

export const signUpSchema = z
  .object({
    userName: z
      .string()
      .min(1, "Username is required")
      .regex(/^[-_A-Za-z0-9]+$/, "Username must contain only numbers and latin letters")
      .min(6, "Minimum number of characters 6")
      .max(30, "Maximum number of characters 30"),
    email: z.email("The email is must match the format example@example.com"),
    password: z
      .string()
      .min(1, "Password is required")
      .regex(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])[-_A-Za-z0-9!"#$%&'()*+,./:;<=>?@[\]\\^{|}~]+$/,
        "Password must contain 0-9, a-z, A-Z, ! \" # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ { | } ~"
      )
      .min(6, "Minimum number of characters 6")
      .max(20, "Maximum number of characters 20"),
    confirmPassword: z.string(),
    agree: z.boolean().refine((data) => data === true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

export type SignUpInputs = z.infer<typeof signUpSchema>
