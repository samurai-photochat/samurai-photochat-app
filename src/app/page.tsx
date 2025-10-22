import { getTotalUsersCount, getLatestPosts } from "@/app/lib/serverActions"
import { HomePage } from "@/pages/home"

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

  return <HomePage totalCount={totalCount} initialPosts={postsData} />
}
