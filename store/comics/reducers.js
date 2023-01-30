import comicActions from "./actions"
import { createReducer } from "@reduxjs/toolkit"

const {
    getComics,
} = comicActions

const initialState = {
    comics: [],
    message: "",
    limit: 10,
}

const comicReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getComics.fulfilled, (state, action) => {
      let newState = {
        comics: action.payload.response.comics,
        limit: action.payload.limit,
        message: action.payload.message,
      }
      return newState
    })
    .addCase(getComics.rejected, (state, action) => {
      let newState = {
        message: action.payload.response,
      }
      return newState
    })
})

export default comicReducer