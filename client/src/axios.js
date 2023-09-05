import axios from "axios";

const instance = axios.create({
    // baseURL: import.meta.env.REACT_APP_API_URI,
    baseURL: "https://my-blog-website-f4un.onrender.com/api/v1/",
});

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        let token = window.localStorage.getItem("persist:blog/user");
        if (token && typeof token === "string") {
            token = JSON.parse(token);
            const accssToken = JSON.parse(token?.token);
            config.headers = { authorization: `Bearer ${accssToken}` };
            return config;
        } else return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return error.response.data;
    }
);
export default instance;
