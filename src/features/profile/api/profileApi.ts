import { baseApi } from "@/shared/api/baseApi"
import { ProfileResponse, UpdateProfileRequest } from "@/features/profile/api/profile.types"
import { BaseApiResponse } from "@/features/auth/api/authApi.types"

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: "users/profile",
      }),
    }),
    updateProfile: builder.mutation<BaseApiResponse, UpdateProfileRequest>({
      query: (body) => ({
        method: "PUT",
        url: "users/profile",
        body,
      }),
    }),
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi
