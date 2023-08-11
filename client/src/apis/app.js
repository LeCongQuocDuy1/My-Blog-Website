import instance from "../axios";

export const apiGetCategories = () =>
    instance({
        url: "/category",
        method: "GET",
    });
