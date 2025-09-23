import { Post } from "@/features/posts/api/postsApi.types"
import { baseApi } from "@/shared/api/baseApi"

export const postsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getPostById: builder.query<Post, number>({
      query: (postId) => ({
        url: `/posts/id/${postId}`,
      }),
    }),
  }),
})

export const { useGetPostByIdQuery } = postsApi
