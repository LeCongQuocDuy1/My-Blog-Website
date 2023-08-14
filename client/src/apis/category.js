import instance from "../axios";

export const apiGetCategoryById = (cid) =>
    instance({
        url: "/category/" + cid,
        method: "GET",
    });
