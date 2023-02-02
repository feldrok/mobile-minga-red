import comicActions from "./actions"
import { createReducer } from "@reduxjs/toolkit"

const {
    getComics,
    getFavouriteComics,
} = comicActions

const initialState = {
    comics: [],
    favouriteComics: [],
    message: "",
    activeSearch: "",
    limit: 10,
}

const comicReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getComics.fulfilled, (state, action) => {
      let newState = {
        comics: action.payload.response.comics,
        favouriteComics: state.favouriteComics,
        limit: action.payload.limit,
        activeSearch: action.payload.activeSearch,
        message: action.payload.message,
      }
      return newState
    })
    .addCase(getFavouriteComics.fulfilled, (state, action) => {
      let newState = {
        favouriteComics: action.payload.response.comics,
        comics: state.comics,
        limit: action.payload.limit,
        order: action.payload.order,
        message: action.payload.message,
      }
      return newState
    })
})

export default comicReducer