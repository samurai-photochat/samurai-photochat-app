import {
  CreatePostRequest,
  Post,
  UploadImagesRequest,
  UploadImagesResponse,
  UserPostsPaginationRequest,
  UserPostsPaginationResponse,
} from "@/features/posts/api/postsApi.types"
import { baseApi } from "@/app/api/baseApi"

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPostById: builder.query<Post, number>({
      query: (postId) => ({
        url: `/posts/id/${postId}`,
      }),
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
    createPost: builder.mutation<Post, CreatePostRequest>({
      query: (body) => {
        return {
          url: `posts`,
          method: "POST",
          body,
        }
      },
    }),
    uploadImages: builder.mutation<UploadImagesResponse, UploadImagesRequest>({
      query: (formData) => {
        return {
          url: `posts/image`,
          method: "POST",
          body: formData,
        }
      },
    }),
    deletePost: builder.mutation<Post, { postId: number }>({
      query: ({ postId }) => ({
        url: `posts/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useGetUserPostsPaginationInfiniteQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUploadImagesMutation,
} = postsApi
