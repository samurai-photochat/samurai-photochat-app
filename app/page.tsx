"use client"

import { useGetTotalCountRegisteredUsersQuery, useGetUserProfileByIdQuery } from "@/app/api/publicUserApi"
import Sidebar from "@/widgets/sidebar/sidebar"

export default function Home() {
  const { data: totalCountData, isLoading: isCountLoading } = useGetTotalCountRegisteredUsersQuery()

  const totalCount = totalCountData?.totalCount

  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: profileError,
  } = useGetUserProfileByIdQuery({ userId: 1200 }, { skip: totalCount === undefined })

  if (isCountLoading) return <p>Загрузка количества пользователей...</p>
  if (isProfileLoading) return <p>Загрузка профиля последнего пользователя...</p>
  if (profileError) return <p>Ошибка при загрузке профиля</p>

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div>
        <h1>Непобедимые самураи</h1>
        <h2>Всего пользователей зарегистрировано: {totalCount}</h2>
        <h2>Имя последнего зарегистрировавшегося пользователя: {profileData?.userName}</h2>
      </div>
    </div>
  )
}
