import s from "./UserInfo.module.scss"
import { UserAvatar } from "@/features/profile/ui/UserInfo/UserAvatar"
import { Username } from "@/features/profile/ui/UserInfo/Username"
import { Stats } from "@/features/profile/ui/UserInfo/Stats"
import { AboutMe } from "@/features/profile/ui/UserInfo/AboutMe"
import Button from "@/shared/ui/button/button"

type Avatar = { url?: string }

type UserMetadata = {
  following?: number
  followers?: number
  publications?: number
}

type UserProfileProps = {
  username?: string
  aboutMe?: string
  avatars?: Avatar[]
  userMetadata?: UserMetadata
  isOwner?: boolean
}

export const UserInfo = ({
                              username,
                              aboutMe,
                              avatars,
                              userMetadata,
                              isOwner,
                            }: UserProfileProps) => {
  const avatarUrl = avatars && avatars.length > 0 ? avatars[0].url || "" : ""

  return (
    <section className={s.userInfo}>
      <div className={s.header}>
        <div className={s.avatarBox}>
          <UserAvatar src={avatarUrl} />
        </div>

        <div className={s.details}>
          <div className={s.titleRow}>
            <Username username={username} />
            {isOwner ? (
              <Button className={s.actionBtn} type="button">
                Profile Settings
              </Button>
            ) : null}
          </div>

          <div className={s.statsRow}>
            <Stats
              following={userMetadata?.following}
              followers={userMetadata?.followers}
              publications={userMetadata?.publications}
            />
          </div>

          <div className={s.aboutRow}>
            <AboutMe aboutMe={aboutMe} />
          </div>
        </div>
      </div>
    </section>
  )
}
