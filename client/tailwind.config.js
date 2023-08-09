/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            padding: {
                main: "0 100px",
            },
            backgroundColor: {
                main: "#3398d4",
            },
            colors: {
                main: "#3398d4",
                error: "#e60023",
            },
        },
    },
    plugins: [],
};
