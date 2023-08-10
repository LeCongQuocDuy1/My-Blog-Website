import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "./user/userSlice";

const commonConfig = {
    key: "blog/user",
    storage,
};

const userConfig = {
    ...commonConfig,
    whiteList: ["isLoggedIn", "token"],
};

export const store = configureStore({
    reducer: {
        app: appSlice,
        user: persistReducer(userConfig, userSlice),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
