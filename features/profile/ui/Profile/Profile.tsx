"use client"
import { useParams } from "next/navigation"
import { useGetUserProfileByIdQuery } from "@/app/api/publicUserApi"
import { useMeQuery } from "@/features/auth/api/authApi"
import s from "./Profile.module.scss"
import Sidebar from "@/widgets/sidebar/sidebar"
import { UserInfo } from "@/features/profile/ui"
import { PostsGrid } from "@/features/posts/ui"

export const Profile = () => {
  const params = useParams()
  const userId = Number(params?.userId)
  const { data: profileData } = useGetUserProfileByIdQuery({ userId })
  const { data: me } = useMeQuery()
  const isOwner = me?.userId === userId
  return (
    <div className={s.profile}>
      <Sidebar />
      <div className={s.content}>
        <UserInfo
          username={profileData?.userName}
          aboutMe={profileData?.aboutMe}
          avatars={profileData?.avatars}
          userMetadata={profileData?.userMetadata}
          isOwner={isOwner}
        />
        <PostsGrid isOwner={isOwner} userId={userId} />
      </div>
    </div>
  )
}
