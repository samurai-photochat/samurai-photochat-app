import { Profile } from "@/features/profile/ui"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ userId: string }>
}

async function getUserProfile(userId: number) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  const response = await fetch(`${baseUrl}/public-user/profile/${userId}`, {
    cache: "no-store",
    next: { revalidate: 60 },
  })
  if (response.status === 404) return notFound()
  if (!response.ok) throw new Error(`Failed to fetch profile: ${response.statusText}`)
  return await response.json()
}

export default async function UserProfile({ params }: Props) {
  const { userId } = await params
  const profileData = await getUserProfile(Number(userId))
  return <Profile initialProfileData={profileData} userId={Number(userId)} />
}
