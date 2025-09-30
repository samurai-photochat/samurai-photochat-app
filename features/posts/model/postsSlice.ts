import { createSlice } from "@reduxjs/toolkit"
import { CanvasImage } from "@/features/posts/ui/StepsCreatePost/CroppingStep/CroppingStep"
//import Image from "next/image"

const initialState: PostsState = {
  files: [],
  images: [],
}

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  selectors: {
    selectFiles: (state) => state.files,
    selectImages: (state) => state.images,
  },
  reducers: (create) => ({
    addFileAC: create.reducer<{ file: File }>((state, action) => {
      const file = action.payload.file
      state.files.push(file)

      const imageSrc = URL.createObjectURL(file)

      const image: CanvasImage = {
        file,
        imageSrc,
        brightness: 100,
        contrast: 100,
        saturate: 100,
        grayscale: 0,
        zoom: 1,
        scale: 490 / 504,
        preview: imageSrc,
      }
      state.images.push(image)
    }),
    changeImageAC: create.reducer<{ index: number; newImage: Partial<CanvasImage> }>((state, action) => {
      const index = action.payload.index
      const images = state.images
      if (index > -1 && index < images.length) {
        const image = state.images[index]
        const newImage = action.payload.newImage
        state.images[index] = { ...image, ...newImage }
      }
    }),
  }),
})

export const { addFileAC, changeImageAC } = postsSlice.actions

export const { selectFiles, selectImages } = postsSlice.selectors

export const postsReducer = postsSlice.reducer

export type PostsState = {
  files: File[]
  images: CanvasImage[]
}
