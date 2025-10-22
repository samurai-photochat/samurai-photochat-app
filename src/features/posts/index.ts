// API
export {
  postsApi,
  useGetPostsByParamsQuery,
  useGetAllPostsQuery,
  useGetUserPostsPaginationInfiniteQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUploadImagesMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "./api/postsApi"

export type {
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
} from "./api/postsApi.types"

// Model
export {
  postsSlice,
  postsReducer,
  addImageAC,
  changeImageAC,
  deleteImageAC,
  clearImagesAC,
  addPostAC,
  selectImages,
} from "./model/postsSlice"
