import comicReducer from "./comics/reducers"
import categoryReducer from "./categories/reducers"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer: {
        categories: categoryReducer,
        comics: comicReducer,
    },
})

export default store