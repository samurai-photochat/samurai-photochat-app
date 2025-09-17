import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import s from "./Avatar.module.scss"

export const UserAvatar = ({ src }: { src: string }) => {
  return (
    <Avatar className={s.avatarRoot}>
      <AvatarImage className={s.avatar} src={src} alt={"UserAvatar Image"} />
      <AvatarFallback className={s.avatar}>MM</AvatarFallback>
    </Avatar>
  )
}
