import comicReducer from "./comics/reducers"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer: {
        comics: comicReducer,
    },
})

export default store