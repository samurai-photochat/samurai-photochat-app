export type Post = {
  id: number
  userName: string
  description: string
  location: string
  images: PostImage[]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: PostOwner
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: boolean
}

export type PostImage = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

export type PostOwner = {
  firstName: string
  lastName: string
}

export type GetUserPostsRequest = {
  userId: number
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
}

export type GetPostsRequest = {
  param: string
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  sortDirection?: SortDirection
}

export type GetUserPostsResponse = {
  totalCount: number
  pageSize: number
  totalUsers: number
  items: Post[]
}

export type GetPostsResponse = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: Post[]
}

export type SortDirection = "asc" | "desc"
