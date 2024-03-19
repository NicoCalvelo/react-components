/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      strokeWidth: {
        1.5: 1.5,
      },
      colors: {
        dark: {
          background: {
            color: "#0e0e14",
            light: "#204754",
          },
          text: {
            color: "#FBFBFB",
            light: "#EAF1F3",
          },
        },
        text: {
          color: "#1E1E23",
          light: "#717184",
        },
        background: {
          color: "#FBFBFB",
          dark: "#EAF1F3",
        },
        primary: {
          light: "#ADE4FF",
          color: "#00AAFF",
          dark: "#114B5F",
          on: "#1E1E23",
        },
        secondary: {
          light: "#E3CADD",
          color: "#B979A9",
          dark: "#6B385F",
          on: "#1E1E23",
        },
        info: {
          light: "#93C5FD",
          color: "#2563EB",
          dark: "#1E40AF",
          on: "#fff",
        },
        success: {
          light: "#B9F4D7",
          color: "#32DE8A",
          dark: "#147B49",
          on: "#1a1414",
        },
        warning: {
          light: "#F9ECC8",
          color: "#EFCB68",
          dark: "#A57E12",
          on: "#1a1414",
        },
        error: {
          light: "#FAB3B9",
          color: "#F45B69",
          dark: "#990A16",
          on: "#1a1414",
        },
      },
      boxShadow: {
        "light": "0 0 10px 0 rgba(255, 255, 255, 0.1)",
        "light-lg": "0 0 15px -5px rgba(255, 255, 255, 0.1)",
        "light-xl": "0 0 20px -10px rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")({ prefix: "ui" })],
};
