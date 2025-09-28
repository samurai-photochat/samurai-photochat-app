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

export type UserPostsPaginationRequest = {
  userId: number
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
}

export type UserPostsPaginationResponse = {
  totalCount: number
  pageSize: number
  totalUsers: number
  items: Post[]
}

export type SortDirection = "asc" | "desc"

export type AllPostsType = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: Post[]
}
