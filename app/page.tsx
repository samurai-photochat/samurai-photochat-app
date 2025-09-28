"use client"

import { useGetTotalCountRegisteredUsersQuery, useGetUserProfileByIdQuery } from "@/shared/api/publicUserApi"
import { useGitHubCallback } from "@/features/auth/hooks/useGitHubCallback"
import Sidebar from "@/widgets/sidebar/sidebar"
import { useAppSelector } from "@/shared/hooks/useAppSelector"

export default function Home() {
  // Обработка callback от GitHub OAuth
  useGitHubCallback()

  const { data: totalCountData, isLoading: isCountLoading } = useGetTotalCountRegisteredUsersQuery()

  const currentUser = useAppSelector((state) => state.auth.currentUser)

  const totalCount = totalCountData?.totalCount

  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: profileError,
  } = useGetUserProfileByIdQuery({ userId: 1200 }, { skip: totalCount === undefined })

  const isLoggedIn = !!currentUser

  if (isCountLoading) return <p>Загрузка количества пользователей...</p>
  if (isProfileLoading) return <p>Загрузка профиля последнего пользователя...</p>
  if (profileError) return <p>Ошибка при загрузке профиля</p>

  return (
    <div style={{ display: "flex" }}>
      {isLoggedIn && <Sidebar />}
      <div>
        <h1>Непобедимые самураи</h1>

        <h2>Всего пользователей зарегистрировано: {totalCount}</h2>
        <h2>Имя последнего зарегистрировавшегося пользователя: {profileData?.userName}</h2>
      </div>
    </div>
  )
}
