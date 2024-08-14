/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["index.html", "script/*.js"],
    theme: {
        colors: {
            blue: "#084886",
            white: "#fff"
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