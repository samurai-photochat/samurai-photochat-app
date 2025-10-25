import { ProfilePage } from "@/pages/profile"
import { getUserProfile } from "@/shared/api/server/serverActions"

type Props = {
  params: Promise<{ userId: string }>
}

export default async function UserProfile({ params }: Props) {
  const { userId } = await params
  const profileData = await getUserProfile(Number(userId))
  return <ProfilePage initialProfileData={profileData} userId={Number(userId)} />
}
