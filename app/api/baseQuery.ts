import { BaseQueryFn, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import LocalStorage from "@/shared/utils/localStorage/localStorage"

const createBaseQuery = () =>
  fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = LocalStorage.getToken()
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  })
export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  return createBaseQuery()(args, api, extraOptions)
}
