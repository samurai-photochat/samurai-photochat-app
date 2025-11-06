import { TextField, TextFieldProps } from "@/shared/ui/TextField"
import { EyeIcon, EyeOffIcon } from "@/shared/assets/icons/components"

export const PasswordField = ({ type, ...rest }: TextFieldProps) => {
  return (
    <TextField type={type} endIcon={type === "password" ? <EyeOffIcon /> : <EyeIcon />} label={"Password"} {...rest} />
  )
}
