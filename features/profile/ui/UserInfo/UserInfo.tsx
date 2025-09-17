import { UserAvatar } from "@/features/profile/ui/UserInfo/UserAvatar"
import { Stats } from "@/features/profile/ui/UserInfo/Stats"
import { AboutMe } from "@/features/profile/ui/UserInfo/AboutMe"
import { Username } from "@/features/profile/ui/UserInfo/Username"
import s from "./UserInfo.module.scss"

type UserInfoProps = {
  username: string
  aboutMe: string
  avatars: Array<{ url: string }>
  userMetadata: { following: number; followers: number; publications: number }
}

export const UserInfo = ({
  username,
  aboutMe,
  avatars,
  userMetadata
}: UserInfoProps) => {
  return (
    <div className={s.userInfoContainer}>
      <div className={s.avatarWrapper}>
        <UserAvatar src={avatars?.[0]?.url || ""} />
      </div>
      <div className={s.detailsWrapper}>
        <div className={s.row}>
          <Username username={username} />
        </div>
        <div className={s.row}>
          <Stats {...userMetadata} />
        </div>
        <div className={s.row}>
          <AboutMe aboutMe={aboutMe} />
        </div>
      </div>
    </div>
  )
}
