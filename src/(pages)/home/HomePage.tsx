import { MainPhotos } from "@/widgets/mainPhotos"
import { AllPostsResponse } from "@/features/posts/api/postsApi.types"

type HomePageProps = {
  totalCount: number
  initialPosts: AllPostsResponse
}

/**
 * Главная страница приложения (FSD pages layer)
 * Композирует widgets и features для главной страницы
 */
export const HomePage = ({ totalCount, initialPosts }: HomePageProps) => {
  return (
    <>
      <h2 style={{ color: "var(--color-light-100)" }}>Всего пользователей зарегистрировано: {totalCount}</h2>
      <MainPhotos initialPosts={initialPosts} />
    </>
  )
}
