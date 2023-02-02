import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { API_URL } from "@env"
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

const addUser = createAsyncThunk("addUser", async (user) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/auth/signup`,
            user,
            handleToken()
        )
        return {
            response: { user: response.data },
            message: "User successfully created",
        }
    } catch (error) {
        return {
            response: { user: error.response.data },
            message: "Failed to create new user.",
        }
    }
})

const verifyUser = createAsyncThunk(
    "verifyUser",
    async ({ user_id, verify_code }) => {
        try {
            console.log(user_id, verify_code)
            const response = await axios.get(
                `${API_URL}/api/auth/verify_code`,
                {
                    params: { user_id, verify_code },
                }
            )
            return {
                response: {
                    message: "User Verified!",
                },
            }
        } catch (error) {
            return {
                message: "Failed to verify user!",
            }
        }
    }
)

const signIn = createAsyncThunk("signIn", async (user) => {
    try {
        let response = await axios.post(
            `${API_URL}/api/auth/signin`,
            user,
            await handleToken()
        )
        return {
            response: { user: response.data },
            message: "User authenticated",
        }
    } catch (error) {
        if (!error.response) {
            throw error
        }

        return rejectWithValue(error.response.data)
    }
})

const signInToken = createAsyncThunk("signInToken", async (user) => {
    try {
        let response = await axios.post(
            `${API_URL}/api/auth/token`,
            user,
            await handleToken()
        )
        return {
            response: { user: response.data },
            message: "User is authenticated",
        }
    } catch (error) {
        console.log(error)
        return {
            response: { user: error.response.data },
            message: "User is not authenticated",
        }
    }
})

const signOut = createAsyncThunk("signOut", async () => {
    try {
        let response = await axios.post(
            `${API_URL}/api/auth/signout`,
            await handleToken()
        )
        return {
            response: { user: response.data },
            message: "User logged out",
        }
    } catch (error) {
        return {
            response: { user: error.response.data },
            message: "User is not logged out",
        }
    }
})


const userActions = {
    addUser,
    signIn,
    signInToken,
    verifyUser,
    signOut,
}

export default userActions
