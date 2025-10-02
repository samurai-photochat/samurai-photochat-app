import {
  Post,
  UserPostsPaginationRequest,
  UserPostsPaginationResponse,
  PostsByParamsResponse,
  PostsQueryParams,
} from "@/features/posts/api/postsApi.types"

import { baseApi } from "@/app/api/baseApi"

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPostById: builder.query<Post, number>({
      query: (postId) => ({
        url: `/posts/id/${postId}`,
      }),
    }),
    getPostsByParams: builder.query<PostsByParamsResponse, PostsQueryParams>({
      query: (arg) => {
        const { param, pageSize, pageNumber, sortBy, sortDirection } = arg
        const params = new URLSearchParams()

        if (pageSize) params.set("pageSize", pageSize.toString())
        if (pageNumber) params.set("pageNumber", pageNumber.toString())
        if (sortBy) params.set("sortBy", sortBy)
        if (sortDirection) params.set("sortDirection", sortDirection)

        return {
          url: `/posts/${param}`,
          params,
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

export const { useGetUserPostsPaginationInfiniteQuery, useGetPostByIdQuery, useGetPostsByParamsQuery } = postsApi
