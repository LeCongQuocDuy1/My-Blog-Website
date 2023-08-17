import instance from "../axios";

export const apiRegister = (data) =>
    instance({
        url: "/user/register",
        method: "POST",
        data,
    });

export const apiLogin = (data) =>
    instance({
        url: "/user/login",
        method: "POST",
        data,
    });

export const apiGetCurrent = () =>
    instance({
        url: "/user/current",
        method: "GET",
    });

export const apiGetUsers = (params) =>
    instance({
        url: "/user/",
        method: "GET",
        params,
    });

    export const apiGetUserById = (uid) =>
    instance({
        url: "/user/" + uid,
        method: "GET",
    });

    export const apiUpdateUser = (data, uid) =>
    instance({
        url: "/user/" + uid,
        method: "PUT",
        data,
    });

    export const apiDeleteUser = (uid) =>
    instance({
        url: "/user/" + uid,
        method: "DELETE",
    });