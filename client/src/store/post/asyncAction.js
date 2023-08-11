import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis/";

// Action => Thực hiện các hành động gọi api và lấy dữ liệu
// Nó sẽ chạy vào payload của thằng slice
export const getPosts = createAsyncThunk(
    "post/posts",
    async (data, { rejectWithValue }) => {
        const response = await apis.apiGetPosts();
        if (!response.status) return rejectWithValue(response);
        return response.posts;
    }
);
