import { createSlice } from "@reduxjs/toolkit"
import { CanvasImage } from "@/features/posts/ui/StepsCreatePost/CroppingStep/CroppingStep"
import { Post } from "@/features/posts/api/postsApi.types"
//import Image from "next/image"

const initialState: PostsState = {
  draftImages: [],
  posts: [],
}

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  selectors: {
    selectImages: (state) => state.draftImages,
    selectPosts: (state) => state.posts,
  },
  reducers: (create) => ({
    addImageAC: create.reducer<{ image: CanvasImage }>((state, action) => {
      state.draftImages.push(action.payload.image)
    }),
    deleteImageAC: create.reducer<{ index: number }>((state, action) => {
      const index = action.payload.index
      const images = state.draftImages
      if (index > -1 && index < images.length) {
        images.splice(index, 1)
      }
    }),
    changeImageAC: create.reducer<{ index: number; image: Partial<CanvasImage> }>((state, action) => {
      const index = action.payload.index
      const images = state.draftImages
      if (index > -1 && index < images.length) {
        const image = images[index]
        images[index] = { ...image, ...action.payload.image }
      }
    }),
    clearImagesAC: create.reducer((state) => {
      state.draftImages = []
    }),
    addPostAC: create.reducer<{ post: Post }>((state, action) => {
      state.posts.push(action.payload.post)
    }),
  }),
})

export const { addImageAC, changeImageAC, deleteImageAC, addPostAC, clearImagesAC } = postsSlice.actions

export const { selectImages, selectPosts } = postsSlice.selectors

export const postsReducer = postsSlice.reducer

export type PostsState = {
  draftImages: CanvasImage[]
  posts: Post[]
}
