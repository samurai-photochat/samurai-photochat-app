import { Profile } from "@/features/profile/ui"
import { PublicProfileResponse } from "@/entities/user"

type ProfilePageProps = {
  initialProfileData: PublicProfileResponse
  userId: number
}

/**
 * Страница профиля пользователя (FSD pages layer)
 * Композирует features для страницы профиля
 */
export const ProfilePage = ({ initialProfileData, userId }: ProfilePageProps) => {
  return <Profile initialProfileData={initialProfileData} userId={userId} />
}
