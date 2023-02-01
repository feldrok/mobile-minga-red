import categoryActions from "./actions"
import { createReducer } from "@reduxjs/toolkit"

const { getCategories, setActiveCategory } = categoryActions

const initialState = {
    categories: [],
    activeCategory: "all",
    message: "",
}

const categoryReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setActiveCategory, (state, action) => {
            let newState = {
                categories: state.categories,
                activeCategory: action.payload,
            }
            return newState
        })
        .addCase(getCategories.fulfilled, (state, action) => {
            let newState = {
                categories: action.payload.response.categories,
                activeCategory: state.activeCategory,
                message: action.payload.message,
            }
            return newState
        })
        .addCase(getCategories.rejected, (state, action) => {
            let newState = {
                message: "error",
            }
            return newState
        })
})

export default categoryReducer