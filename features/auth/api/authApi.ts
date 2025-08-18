import { baseApi } from "@/app/api/baseApi"
import { ApiErrorResultDto, MeViewDto } from "./authApi.types"
// тип user
export type UserType = {
  userName: string
  email: string
  password: string
  baseUrl: string
}

export type LoginType = {
  email: string
  password: string
}
// тип кода из query
export type ConfirmationType = {
  confirmationCode: string
}
// тип для запроса при истекшей ссылке
export type ResendingEmailType = {
  email: string
  baseUrl: string
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      me: builder.query<MeViewDto, void>({
        query: () => {
          return {
            method: "GET",
            url: "/auth/me",
          }
        },
      }),
      registration: builder.mutation<ApiErrorResultDto, UserType>({
        query: (user) => {
          return {
            method: "POST",
            url: "auth/registration",
            body: user,
          }
        },
      }),
      confirmation: builder.mutation<ApiErrorResultDto, ConfirmationType>({
        query: (confirmCode) => {
          return {
            method: "POST",
            url: "auth/registration-confirmation",
            body: confirmCode,
          }
        },
      }),
      emailResending: builder.mutation<ApiErrorResultDto, ResendingEmailType>({
        query: (confirmCode) => {
          return {
            method: "POST",
            url: "auth/registration-email-resending",
            body: confirmCode,
          }
        },
      }),
      login: builder.mutation<{ accessToken: string }, LoginType>({
        query: (arg) => {
          return {
            method: "POST",
            url: "auth/login",
            body: arg,
          }
        },
      }),
      logout: builder.mutation<{ success: boolean }, void>({
        query: () => {
          return {
            method: "POST",
            url: "auth/logout",
          }
        },
      }),
    }
  },
})

export const {
  useMeQuery,
  useRegistrationMutation,
  useConfirmationMutation,
  useEmailResendingMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApi
