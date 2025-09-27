import { Post, UserPostsPaginationRequest, UserPostsPaginationResponse } from "@/features/posts/api/postsApi.types"

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
  endpoints: (builder) => ({
    getPostById: builder.query<Post, number>({
      query: (postId) => ({
        url: `/posts/id/${postId}`,
      }),
    }),
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
          options,
        }
      },
    }),
    getUserPostsPagination: builder.infiniteQuery<
      UserPostsPaginationResponse,
      UserPostsPaginationRequest,
      string | undefined
    >({
      infiniteQueryOptions: {
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
          const lastPost = lastPage.items[lastPage.items.length - 1]
          return lastPost ? lastPost.id.toString() : undefined
        },
      },
      query: (arg) => {
        const { userId, endCursorPostId, pageSize = 8, sortBy, sortDirection } = arg.queryArg
        const params = new URLSearchParams()
        params.set("pageSize", pageSize.toString())
        if (sortBy) params.set("sortBy", sortBy.toString())
        if (sortDirection) params.set("sortDirection", sortDirection.toString())
        return {
          url: `posts/user/${userId}/${endCursorPostId ?? ""}`,
          params,
        }
      },
    }),
  }),
})

export const { useGetUserPostsPaginationInfiniteQuery, useGetPostByIdQuery, useGetPostQuery, useGetAllPostsQuery } =
  postsApi
