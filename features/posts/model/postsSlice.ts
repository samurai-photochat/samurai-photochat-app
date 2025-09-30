import { createSlice } from "@reduxjs/toolkit"
import { CanvasImage } from "@/features/posts/ui/StepsCreatePost/CroppingStep/CroppingStep"
//import Image from "next/image"

const initialState: PostsState = {
  images: [],
}

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  selectors: {
    selectImages: (state) => state.images,
  },
  reducers: (create) => ({
    addImageAC: create.reducer<{ file: File }>((state, action) => {
      const file = action.payload.file

      const imageSrc = URL.createObjectURL(file)

      const image: CanvasImage = {
        file,
        imageSrc,
        filter: "",
        zoom: 1,
        scale: 490 / 504,
        preview: imageSrc,
      }
      state.images.push(image)
    }),
    deleteImageAC: create.reducer<{ index: number }>((state, action) => {
      const index = action.payload.index
      const images = state.images
      if (index > -1 && index < images.length) {
        images.splice(index, 1)
      }
    }),
    changeImageAC: create.reducer<{ index: number; image: Partial<CanvasImage> }>((state, action) => {
      const index = action.payload.index
      const images = state.images
      if (index > -1 && index < images.length) {
        const image = state.images[index]
        state.images[index] = { ...image, ...action.payload.image }
      }
    }),
    setCurrentIndexAC: create.reducer<{ index: number }>((state, action) => {
      const index = action.payload.index
      if (index > -1 && index < state.images.length) {
      }
    }),
    setCurrentImageAC: create.reducer<{ index: number; image: Partial<CanvasImage> }>((state, action) => {
      const index = action.payload.index
      const image = action.payload.image
      changeImageAC({ index, image })
    }),
  }),
})

export const { addImageAC, changeImageAC, deleteImageAC, setCurrentIndexAC, setCurrentImageAC } = postsSlice.actions

export const { selectImages } = postsSlice.selectors

export const postsReducer = postsSlice.reducer

export type PostsState = {
  images: CanvasImage[]
}
