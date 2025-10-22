import { getTotalUsersCount, getLatestPosts } from "@/shared/api/server/serverActions"
import { HomePage } from "@/pages/home"
import styles from "./page.module.css"

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
    <div className={styles.page}>
      <main className={styles.main}>
        <HomePage totalCount={totalCount} initialPosts={postsData} />
      </main>
      {/* При необходимости можно добавить CTA или футер ниже */}
      <footer className={styles.footer} />
    </div>
  )
}
