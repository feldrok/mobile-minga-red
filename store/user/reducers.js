import { createReducer } from "@reduxjs/toolkit";
import userActions from "./actions";

const { signIn, signInToken, addUser, verifyUser, signOut } = userActions

const initialState = {
    user: [],
    accessToken: "",
    isAuthenticated: false,
    message: ""
}

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(signIn.fulfilled, (state, action) => {
            let newState = {
                user: action.payload.response.user,
                accessToken: action.payload.response.user.response.token,
                isAuthenticated: true,
                message: action.payload.message
            }
            return newState
        })
        .addCase(signInToken.fulfilled, (state, action) => {
            let newState = {
                user: action.payload.response.user,
                isAuthenticated: true,
                message: action.payload.message
            }
            return newState
        })
        .addCase(signInToken.rejected, (state, action) => {
            let newState = {
                message: "error"
            }
            return newState
        })
        .addCase(addUser.fulfilled, (state, action) => {
            let newState = {
                user:action.payload.response.user,
                message: action.payload.message
            }
            return newState
        })
        .addCase(addUser.rejected, (state, action) => {
            let newState = {
                message: "Error!"
            }
            return newState
        })
        .addCase(verifyUser.fulfilled, (state, action) => {
            let newState = {
                message: action.payload.message
            }
            return newState
        })
        .addCase(verifyUser.rejected, (state, action) => {
            let newState = {
                message: action.payload.message
            }
            return newState
        })
        .addCase(signOut.fulfilled, (state, action) => {
            let newState = {
                isAuthenticated: false,
                message: action.payload.message
            }
            return newState
        })
})

export default userReducer