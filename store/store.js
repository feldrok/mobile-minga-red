import comicReducer from "./comics/reducers"
import categoryReducer from "./categories/reducers"
import userReducer from "./user/reducers"
import reactionReducer from "./reactions/reducers"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer: {
        categories: categoryReducer,
        comics: comicReducer,
        user: userReducer,
        reactions: reactionReducer
    },
})

export default store