import { baseApi } from "@/app/api/baseApi"

export type UserType = {
  userName: string
  email: string
  password: string
  baseUrl: string
}

type BaseResponse = {
  statusCode: number
  messages: Array<Massage>
  error: string
}

type Massage = {
  message: string
  field: string
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      registration: builder.mutation<BaseResponse, UserType>({
        query: (user) => {
          return {
            method: "POST",
            url: "https://inctagram.work/api/v1/auth/registration",
            body: { user },
          }
        },
      }),
    }
  },
})

export const { useRegistrationMutation } = authApi
