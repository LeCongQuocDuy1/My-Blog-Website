import instance from "../axios";

export const apiCreateCategory = (data) =>
    instance({
        url: "/category/",
        method: "POST",
        data,
    });

export const apiGetCategorys = (params) =>
    instance({
        url: "/category/",
        method: "GET",
        params,
    });

export const apiGetCategoryById = (pid) =>
    instance({
        url: "/category/" + pid,
        method: "GET",
    });

export const apiGetCategoryByCategory = (cid) =>
    instance({
        url: "/category/" + cid,
        method: "GET",
    });

export const apiUploadImageCategory = (pid) =>
    instance({
        url: "/category/upload/" + pid,
        method: "PUT",
    });

export const apiDeleteCategory = (pid) =>
    instance({
        url: "/category/" + pid,
        method: "DELETE",
    });
export const apiUpdateCategory = (pid, data) =>
    instance({
        url: "/category/" + pid,
        method: "PUT",
        data: data,
    });