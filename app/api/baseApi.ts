import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "@/app/api/baseQuery"

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Auth", "User", "Post"],
  baseQuery: baseQuery,
  endpoints: () => ({}),
})
