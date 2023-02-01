import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { API_URL, TOKEN } from '@env'

let config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
    },
}

const getComics = createAsyncThunk("getComics", async ({ limit = 10, title = "", category_id = "" }) => {
    try {
        let response = await axios.get(
            `${API_URL}/api/comics?title=${title}&category_id=${category_id}&limit=${limit}`,
            config
        )
        return {
            response: { comics: response.data },
            limit: limit,
            message: "Comics obtained",
        }
    } catch (error) {
        return {
            error: error,
            message: "Error obtaining comics",
        }
    }
})

const getFavouriteComics = createAsyncThunk(
    "getFavouriteComics",
    async ({ user_id, limit, category_id, order, title = "" }) => {
        if (limit === undefined) {
            limit = 4
        }
        if (category_id === undefined) {
            category_id = ""
        }
        if (order === undefined) {
            order = "asc"
        }
        try {
            let response = await axios.get(
                `${API_URL}/api/reactions/favourites/${user_id}?title=${title}&category_id=${category_id}&limit=${limit}&order=${order}`,
                config
            )
            return {
                response: { comics: response.data },
                limit: limit,
                order: order,
                activeSearch: title,
                message: "Comics obtained",
            }
        } catch (error) {
            return {
                response: { comics: error.response.data },
                limit: limit,
                message: "Error obtaining comics",
            }
        }
    }
)

const comicActions = {
    getComics,
    getFavouriteComics,
}

export default comicActions
