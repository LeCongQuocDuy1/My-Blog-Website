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
