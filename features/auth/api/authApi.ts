import { baseApi } from "@/app/api/baseApi"
import { BaseResponse, Response } from "./authApi.types"

export type UserType = {
  userName: string
  email: string
  password: string
  baseUrl: string
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      me: builder.query<Response, void>({
        query: () => {
          return {
            method: "GET",
            url: "/auth/me",
          }
        },
      }),
      registration: builder.mutation<BaseResponse, UserType>({
        query: (user) => {
          return {
            method: "POST",
            url: "auth/registration",
            body: user,
          }
        },
      }),
      login: builder.mutation<BaseResponse, { email: string; password: string }>({
        query: (credentials) => {
          return {
            method: "POST",
            url: "auth/login",
            body: credentials,
          }
        },
      }),
    }
  },
})

export const { useRegistrationMutation, useLoginMutation, useMeQuery } = authApi
