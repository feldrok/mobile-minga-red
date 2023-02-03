import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL, TOKEN } from '@env'

const handleToken = () => {
    let config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
        },
    }
    return config
}

const getCategories = createAsyncThunk("getCategories", async () => {
    try {
        let response = await axios.get(`${API_URL}/api/categories`, await handleToken())
        return {
            response: { categories: response.data },
            message: "Categories obtained",
        }
    } catch (error) {
        return {
            response: { categories: error.response.data },
            message: "Error obtaining categories",
        }
    }
})

const setActiveCategory = createAction("setActiveCategory", (category) => {
    return {
        response: { activeCategory: category },
        payload: category,
    }
})

const categoryActions = {
    getCategories,
    setActiveCategory,
}

export default categoryActions
