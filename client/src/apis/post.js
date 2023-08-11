import instance from "../axios";

// export const apiGetPosts = () =>
//     instance({
//         url: "/post",
//         method: "GET",
//     });

export const apiGetPosts = (params) =>
    instance({
        url: "/post",
        method: "GET",
        params,
    });
