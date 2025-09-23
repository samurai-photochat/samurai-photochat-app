import { baseApi } from "@/app/api/baseApi"
import { AllPostsType, PostType } from "./postsApi.type"

type paramsPostsType = {
  param: string
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  sortDirection?: "asc" | "desc"
}

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getPost: builder.query<PostType, number>({
        query: (postId: number) => {
          return {
            method: "GET",
            url: `/posts/id/${postId}`,
          }
        },
      }),
      getAllPosts: builder.query<AllPostsType, paramsPostsType>({
        query: (arg) => {
          const { param, ...options } = arg
          return {
            method: "GET",
            url: `/posts/${param}`,
            //url: `/public-posts/all/${param}`,
            options,
          }
        },
      }),
      // registration: builder.mutation({
      //   query: (user) => {
      //     return {
      //       method: "POST",
      //       url: "auth/registration",
      //       body: user,
      //     }
      //   },
      // }),
    }
  },
})

export const { useGetPostQuery, useGetAllPostsQuery } = postsApi
