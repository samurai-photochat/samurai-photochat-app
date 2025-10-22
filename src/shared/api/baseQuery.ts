import { BaseQueryFn, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import LocalStorage from "@/shared/utils/localStorage"
import { handleError } from "@/shared/api/handleError"

const createBaseQuery = (skipAuth?: boolean) =>
  fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      if (!skipAuth) {
        const token = LocalStorage.getToken()
        if (token) {
          headers.set("Authorization", `Bearer ${token}`)
        }
      }
      return headers
    },
  })
interface ExtraOptions {
  skipAuth?: boolean
}

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, ExtraOptions> = async (
  args,
  api,
  extraOptions
) => {
  const skipAuth = extraOptions?.skipAuth
  const result = await createBaseQuery(skipAuth)(args, api, extraOptions)
  handleError(api, result)
  return result
}
