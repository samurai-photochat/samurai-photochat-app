"use client"

import { useGetTotalCountRegisteredUsersQuery } from "@/app/api/publicUserApi"
import { useMeQuery } from "@/features/auth/api/authApi"
import Sidebar from "@/widgets/sidebar/sidebar"
import { MainPhotos } from "@/widgets/mainPhotos"

export default function Home() {
  const { data: totalCountData, isLoading: isCountLoading } = useGetTotalCountRegisteredUsersQuery()

  const { data: user, isError, isLoading } = useMeQuery()

  const totalCount = totalCountData?.totalCount

  if (isLoading) return <div style={{ color: "var(--color-light-100)" }}>...LoadingSpinner</div>

  const isLoggedIn = !!user && !isError

  if (isCountLoading) return <p>Загрузка количества пользователей...</p>

  return (
    <div style={{}}>
      {isLoggedIn && <Sidebar />}
      <div style={{ padding: "20px", margin: "0 auto" }}>
        <h2 style={{ color: "var(--color-light-100)" }}>Всего пользователей зарегистрировано: {totalCount}</h2>
        <MainPhotos />
      </div>
    </div>
  )
}
