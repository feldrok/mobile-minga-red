import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { API_URL } from '@env'
import AsyncStorage from "@react-native-async-storage/async-storage"

const handleToken = async () => {
    const TOKEN = await AsyncStorage.getItem("token")
    let config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
        },
    }
    return config
}

const addReaction = createAsyncThunk("addReaction", async (reaction) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/reactions`,
            reaction,
            await handleToken()
        )
        console.log(response)
        return {
            response: { reaction: response.data },
            message: "Reaction added",
        }
    } catch (error) {
        console.log(error)
        return {
            response: { reaction: error.response.data },
            message: "Error creating comic",
        }
    }
})

const getReactions = createAsyncThunk("getReactions", async ({ comic_id }) => {
    try {
        const response = await axios.get(
            `${API_URL}/api/reactions/?comic_id=${comic_id}`,
            await handleToken()
        )
        return {
            response: { reactions: response.data },
            message: "Reactions obtained",
        }
    } catch (error) {
        return {
            response: { reactions: error.response.data },
            message: "Error obtaining reactions",
        }
    }
})

const reactionActions = {
    addReaction,
    getReactions,
}

export default reactionActions