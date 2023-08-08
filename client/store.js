import { configureStore } from "@reduxjs/toolkit";

// Tạo configureStore với các reducers và middleware của bạn
const store = configureStore({
    reducer: {
        // Định nghĩa reducers của bạn ở đây
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // Cấu hình middleware của bạn ở đây
        }),
});

export default store;
