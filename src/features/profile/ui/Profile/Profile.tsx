"use client"
import { PublicProfileResponse } from "@/entities/user"
import { useMeQuery } from "@/features/auth/api/authApi"
import s from "./Profile.module.scss"
import Sidebar from "@/widgets/sidebar/sidebar"
import { UserInfo } from "@/features/profile/ui"
import { PostsGrid } from "@/features/posts/ui"

type ProfileProps = {
  userId: number
  initialProfileData?: PublicProfileResponse | null
}

export const Profile = ({ userId, initialProfileData }: ProfileProps) => {
  const { data: me } = useMeQuery()
  const isOwner = me?.userId === userId

  return (
    <div className={s.profile}>
      <Sidebar />
      <div className={s.content}>
        <UserInfo
          username={initialProfileData?.userName}
          aboutMe={initialProfileData?.aboutMe}
          avatars={initialProfileData?.avatars}
          userMetadata={initialProfileData?.userMetadata}
          isOwner={isOwner}
        />
        <PostsGrid isOwner={isOwner} userId={userId} />
      </div>
    </div>
  )
}
