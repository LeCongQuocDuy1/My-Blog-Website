import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        categories: null,
        isLoading: false,
    },
    reducers: {
        // logout: (state) => {
        //     state.isLoading = false;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCategories.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(actions.getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
        });
        builder.addCase(actions.getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
});

// Action creators are generated for each case reducer function
export const {} = appSlice.actions;

export default appSlice.reducer;
