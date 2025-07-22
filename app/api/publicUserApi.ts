import { baseApi } from "@/app/api/baseApi"

export const publicUserApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTotalCountRegisteredUsers: build.query<TotalCountResponse, void>({
      query: () => "public-user",
    }),
    getUserProfileById: build.query<PublicProfileResponse, { userId: number }>({
      query: ({ userId }) => `public-user/profile/${userId}`,
    }),
  }),
})

export const { useGetTotalCountRegisteredUsersQuery, useGetUserProfileByIdQuery } = publicUserApi

//types
type TotalCountResponse = {
  totalCount: number
}

export type PublicProfileResponse = {
  id: number
  userName: string | number
  aboutMe: string
  avatars: {
    url: string
    width: number
    height: number
    fileSize: number
    createdAt: string
  }[]
  userMetadata: {
    following: number
    followers: number
    publications: number
  }
  hasPaymentSubscription: boolean
}
