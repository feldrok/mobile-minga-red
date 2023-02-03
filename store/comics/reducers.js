import comicActions from "./actions"
import { createReducer } from "@reduxjs/toolkit"

const {
    getComics,
    getFavouriteComics
} = comicActions

const initialState = {
    comics: [],
    message: "",
    activeSearch: "",
    limit: 10,
}

const comicReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getComics.fulfilled, (state, action) => {
      let newState = {
        comics: action.payload.response.comics,
        limit: action.payload.limit,
        activeSearch: action.payload.activeSearch,
        message: action.payload.message,
      }
      return newState
    })
    .addCase(getFavouriteComics.fulfilled, (state, action) => {
      let newState = {
        comics: action.payload.response.comics,
        limit: action.payload.limit,
        order: action.payload.order,
        message: action.payload.message,
      }
      return newState
    })
    .addCase(getComics.rejected, (state, action) => {
      let newState = {
          message: "error comics",
      }
      return newState
  })

})

export default comicReducer