export type ProfileResponse = {
  id: number
  userName: string
  firstName: string
  lastName: string
  city: string
  country: string
  region: string
  dateOfBirth: string
  aboutMe: string
  avatars: Avatar[]
  createdAt?: string
}

export type UpdateProfileRequest = {
  userName: string
  firstName: string
  lastName: string
  city?: string
  country?: string
  region?: string
  dateOfBirth?: string
  aboutMe?: string
}

export type Avatar = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt?: string
}
