import instance from "../axios";

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
