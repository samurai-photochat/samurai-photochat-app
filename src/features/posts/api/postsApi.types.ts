export type SortDirection = "asc" | "desc"

export type Image = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

export type Owner = {
  firstName: string
  lastName: string
}

export type Post = {
  id: number
  userName: string
  description: string
  location: string
  images: Image[]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: Owner
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: boolean
}

export type PaginationResponse = {
  pageSize: number
  totalCount: number
  items: Post[]
}

export type UserPostsPaginationRequest = {
  userId: number
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
}

export type UserPostsPaginationResponse = PaginationResponse & {
  totalUsers: number
}

export type PostsByParamsResponse = PaginationResponse & {
  notReadCount: number
}

export type PostsQueryParams = {
  param: string
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  sortDirection?: SortDirection
}

export type AllPostsRequest = {
  endCursorPostId?: string
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
}

export type AllPostsResponse = PaginationResponse
export type CreatePostRequest = {
  description: string
  childrenMetadata: {
    uploadId: string
  }[]
}

export type UploadImagesResponse = {
  images: Image[]
}

export type UpdatePostRequest = {
  postId: number
  description: string
}
