import { createAction, createAsyncThunk } from "@reduxjs/toolkit"

import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL

let config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzVhNzJkMzM5NWFkYzcxNzRjZWE1MyIsImlhdCI6MTY3NTEwNDc0OCwiZXhwIjoxNjc1MTkxMTQ4fQ.E62qCYL4I8tBfB0t53P3i5gxmdGUJrFHF-MjtdivE3E`,
    },
}

const getCategories = createAsyncThunk("getCategories", async () => {
    try {
        let response = await axios.get(`http://192.168.4.29:8000/api/categories`, config)
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
