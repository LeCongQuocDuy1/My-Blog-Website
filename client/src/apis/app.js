import instance from "../axios";

// export const apiGetCategories = async () => {
//     try {
//         const response = await instance.get("/category");
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         throw error;
//     }
// };

export const apiGetCategories = () =>
    instance({
        url: "/category",
        method: "GET",
    });
