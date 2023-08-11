import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";

export const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: null,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actions.getPosts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(actions.getPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts = action.payload;
        });
        builder.addCase(actions.getPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
});

// Action creators are generated for each case reducer function
export const {} = postSlice.actions;

export default postSlice.reducer;
