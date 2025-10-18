import {
  Post,
  PostsByParamsResponse,
  PostsQueryParams,
  AllPostsRequest,
  AllPostsResponse,
  CreatePostRequest,
  UploadImagesRequest,
  UploadImagesResponse,
  UserPostsPaginationRequest,
  UserPostsPaginationResponse,
  UpdatePostRequest,
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
      number | undefined
    >({
      infiniteQueryOptions: {
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
          const lastPost = lastPage.items[lastPage.items.length - 1]
          return lastPost ? lastPost.id : undefined
        },
      },
      query: ({ queryArg, pageParam }) => {
        const { userId, pageSize = 8, sortBy, sortDirection } = queryArg
        const params = new URLSearchParams()
        params.set("pageSize", pageSize.toString())
        if (sortBy) params.set("sortBy", sortBy.toString())
        if (sortDirection) params.set("sortDirection", sortDirection.toString())
        return {
          url: `posts/user/${userId}/${pageParam ?? ""}`,
          params,
        }
      },
    }),
    getAllPosts: builder.query<AllPostsResponse, AllPostsRequest>({
      query: (arg) => {
        const { endCursorPostId = "", pageSize = 5, sortBy, sortDirection } = arg
        const params = new URLSearchParams()
        params.set("pageSize", pageSize.toString())
        if (sortBy) params.set("sortBy", sortBy)
        if (sortDirection) params.set("sortDirection", sortDirection)
        return {
          url: `posts/all/${endCursorPostId}`,
          params,
        }
      },
      extraOptions: { skipAuth: true },
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
    updatePost: builder.mutation<Post, UpdatePostRequest>({
      query: ({ postId, description }) => ({
        url: `posts/${postId}`,
        method: "PUT",
        body: { description },
      }),
    }),
  }),
})

export const {
  useGetPostsByParamsQuery,
  useGetAllPostsQuery,
  useGetUserPostsPaginationInfiniteQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUploadImagesMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi
