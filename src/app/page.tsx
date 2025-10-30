import { getTotalUsersCount, getLatestPosts } from "@/shared/api/server/serverActions"
import { HomePage } from "@/pages/home"
import styles from "./page.module.css"

// Включаем ISR с ревалидацией каждые 60 секунд
export const revalidate = 60

export default async function Home() {
  const [totalCountData, postsData] = await Promise.all([
    getTotalUsersCount().catch(() => Promise.resolve({ totalCount: 0 })),
    getLatestPosts().catch(() => Promise.resolve({ items: [], pageSize: 4, totalCount: 0 })),
  ])

  const totalCount = totalCountData.totalCount

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HomePage totalCount={totalCount} initialPosts={postsData} />
      </main>
      <footer className={styles.footer} />
    </div>
  )
}
