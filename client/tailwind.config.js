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
                overlay: "rgba(0, 0, 0, 0.3)",
            },
            colors: {
                main: "#3398d4",
                error: "#e60023",
            },
            fontSize: {
                error: "16px",
            }
        },
        fontFamily: {
            content: ["Noto Serif", "Regular", "Times New Roman"],
        },
    },
    plugins: [],
};
