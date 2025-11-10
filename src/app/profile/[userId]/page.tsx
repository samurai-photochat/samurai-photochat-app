import { ProfilePage } from "@/pages/profile"
import { getUserProfile } from "@/shared/api/server/serverActions"
import { PostModalServer } from "@/features/posts/ui/PostModal"

type Props = {
  params: Promise<{ userId: string }>
  searchParams: Promise<{ postId?: string }>
}

export default async function UserProfile({ params, searchParams }: Props) {
  const { userId } = await params
  const searchParamsData = await searchParams
  const postId = searchParamsData.postId ? Number(searchParamsData.postId) : null

  const profileData = await getUserProfile(Number(userId))

  return (
    <>
      <ProfilePage initialProfileData={profileData} userId={Number(userId)} />
      {postId && <PostModalServer postId={postId} />}
    </>
  )
}
