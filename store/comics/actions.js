import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzVhNzJkMzM5NWFkYzcxNzRjZWE1MyIsImlhdCI6MTY3NDg1OTMwNSwiZXhwIjoxNjc0OTQ1NzA1fQ.VkVHF48gAQ6BsjOGa26zjAfJAIESbqDHFltLysxk81s`,
    },
}

const getComics = createAsyncThunk("getComics", async ({ limit, title, category_id }) => {
    if (limit === undefined) {
        limit = 10
    }
    if (title === undefined) {
        title = ""
    }
    if (category_id === undefined) {
        category_id = ""
    }
    try {
        let response = await axios.get(
            `http://localhost:8000/api/comics?title=${title}&category_id=${category_id}&limit=${limit}`,
            config
        )
        return {
            response: { comics: response.data },
            limit: limit,
            message: "Comics obtained",
        }
    } catch (error) {
        return {
            response: { comics: error.response },
            message: "Error obtaining comics",
        }
    }
})

const comicActions = {
    getComics,
}

export default comicActions
