import { baseApi } from "@/shared/api/baseApi"
import { ProfileResponse, UpdateProfileRequest, UploadAvatarResponse } from "@/features/profile/api/profile.types"
import { BaseApiResponse } from "@/features/auth/api/authApi.types"

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: "users/profile",
      }),
      providesTags: () => [{ type: "Profile" }],
    }),
    updateProfile: builder.mutation<BaseApiResponse, UpdateProfileRequest>({
      query: (body) => ({
        method: "PUT",
        url: "users/profile",
        body,
        invalidatesTags: ["Profile"],
      }),
    }),
    uploadAvatar: builder.mutation<UploadAvatarResponse, FormData>({
      query: (body) => ({
        method: "POST",
        url: "users/profile/avatar",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    deleteAvatar: builder.mutation<BaseApiResponse, void>({
      query: () => ({
        method: "DELETE",
        url: "users/profile/avatar",
        invalidatesTags: ["Profile"],
      }),
    }),
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation, useUploadAvatarMutation, useDeleteAvatarMutation } =
  profileApi
