import { baseApi } from "@/app/api/baseApi"
import { ApiErrorResultDto, MeViewDto } from "./authApi.types"

export type UserType = {
  userName: string
  email: string
  password: string
  baseUrl: string
}
export type ConfirmationType = {
  confirmationCode: string
}
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
            url: "/auth/registration",
            body: user,
          }
        },
      }),
      confirmation: builder.mutation<ApiErrorResultDto, ConfirmationType>({
        query: (confirmCode) => {
          return {
            method: "POST",
            url: "/auth/registration-confirmation",
            body: confirmCode,
          }
        },
      }),
      emailResending: builder.mutation<ApiErrorResultDto, ResendingEmailType>({
        query: (confirmCode) => {
          return {
            method: "POST",
            url: "/auth/registration-email-resending",
            body: confirmCode,
          }
        },
      }),
    }
  },
})

export const { useMeQuery, useRegistrationMutation, useConfirmationMutation, useEmailResendingMutation } = authApi
