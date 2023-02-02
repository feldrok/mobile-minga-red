import { createReducer } from "@reduxjs/toolkit"
import reactionActions from "./actions"

const { addReaction, getReactions } = reactionActions

const initialState = {
    reactions: [],
    reaction: [],
    message: "",
}

const reactionReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addReaction.fulfilled, (state, action) => {
            let newState = {
                reactions: state.reactions,
                reaction: action.payload.response.reaction,
                message: action.payload.message,
            }
            return newState
        })
        .addCase(getReactions.fulfilled, (state, action) => {
            let newState = {
                reactions: action.payload.response.reactions,
                reaction: state.reaction,
                message: action.payload.message,
            }
            return newState
        })
})

export default reactionReducer