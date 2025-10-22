import { getTotalUsersCount, getLatestPosts } from "@/app/lib/serverActions"
import { MainPhotos } from "@/widgets/mainPhotos"
import { ClientAuthWrapper } from "@/features/auth/ui/AuthWrapper/ClientAuthWrapper"

// Включаем ISR с ревалидацией каждые 60 секунд
export const revalidate = 60

/**
 * Главная страница приложения
 * Серверный компонент с ISR для быстрой загрузки и SEO
 * Публичный контент рендерится на сервере, авторизация проверяется на клиенте
 */
export default async function Home() {
  // Получаем данные на сервере с ISR
  const [totalCountData, postsData] = await Promise.all([
    getTotalUsersCount().catch(() => ({ totalCount: 0 })),
    getLatestPosts().catch(() => ({ items: [], pageSize: 4, totalCount: 0 })),
  ])

  const totalCount = totalCountData.totalCount

  return (
    <ClientAuthWrapper>
      <h2 style={{ color: "var(--color-light-100)" }}>Всего пользователей зарегистрировано: {totalCount}</h2>
      <MainPhotos initialPosts={postsData} />
    </ClientAuthWrapper>
  )
}
