import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import s from "./UserAvatar.module.scss"

export const UserAvatar = ({ src }: { src: string }) => {
  return (
    <Avatar>
      <AvatarImage className={s.avatar} src={src} alt={"User Avatar Image"} />
      <AvatarFallback className={s.avatar}>MM</AvatarFallback>
    </Avatar>
  )
}
