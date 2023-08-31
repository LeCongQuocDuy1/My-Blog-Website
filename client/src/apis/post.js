import instance from "../axios";

export const apiCreatePost = (data) =>
    instance({
        url: "/post/",
        method: "POST",
        data,
    });

export const apiGetPosts = (params) =>
    instance({
        url: "/post",
        method: "GET",
        params,
    });

export const apiGetPostById = (pid) =>
    instance({
        url: "/post/" + pid,
        method: "GET",
    });

export const apiGetPostByCategory = (cid) =>
    instance({
        url: "/post/" + cid,
        method: "GET",
    });

export const apiUploadImagePost = (pid) =>
    instance({
        url: "/post/upload/" + pid,
        method: "PUT",
    });

export const apiDeletePost = (pid) =>
    instance({
        url: "/post/" + pid,
        method: "DELETE",
    });
export const apiUpdatePost = (pid, data) =>
    instance({
        url: "/post/" + pid,
        method: "PUT",
        data: data,
    });