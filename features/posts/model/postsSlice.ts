import { createSlice } from "@reduxjs/toolkit"

const initialState: PostsState = {}

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
})

type PostsState = {}
