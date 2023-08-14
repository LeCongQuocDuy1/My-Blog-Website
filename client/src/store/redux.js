import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import userSlice from "./user/userSlice";
import postSlice from "./post/postSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const commonConfig = {
    key: "blog/user",
    storage,
};

const userConfig = {
    ...commonConfig,
    whiteList: ["isLoggedIn", "token", "current"],
};

export const store = configureStore({
    reducer: {
        app: appSlice,
        post: postSlice,
        user: persistReducer(userConfig, userSlice),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
