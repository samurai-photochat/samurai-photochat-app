import { GetUserPostsRequest, GetUserPostsResponse, Post } from "@/features/posts/api/postsApi.types"
import { baseApi } from "@/app/api/baseApi"

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPostById: builder.query<Post, number>({
      query: (postId) => ({
        url: `/posts/id/${postId}`,
      }),
    }),
    
    getUserPosts: builder.infiniteQuery<GetUserPostsResponse, GetUserPostsRequest, string | undefined>({
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

export const { useGetUserPostsInfiniteQuery, useGetPostByIdQuery } = postsApi