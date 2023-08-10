import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        isLoading: false,
        current: null,
        token: null,
    },
    reducers: {
        // Reducer login
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        // Reducer logout
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCurrent.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
        });
        builder.addCase(actions.getCurrent.rejected, (state, action) => {
            state.isLoading = false;
            state.current = null;
        });
    },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
