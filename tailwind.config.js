/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["index.html", "script/*.js"],
    theme: {
        colors: {
            blue: "#084886",
            red: "#E31837",
            white: "#fff",
            gray: "#B3B2B2",
            black: "#000"
        },
        fontFamily: {
            dosis: ["Dosis", "sans-serif"]
          },
        extend: {
            width: {
                "wfa": "-webkit-fill-available"
            },
            spacing: {
                112: "28rem",
                128: "32rem",
                160: "40rem",
                192: "48rem"
            }
        },
    },
    plugins: [],
  }