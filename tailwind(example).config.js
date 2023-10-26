/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./front/**/*.{js,jsx,ts,tsx}", "./templates/**/*.html.twig"],
  theme: {
    extend: {
      strokeWidth: {
        1.5: 1.5,
      },
      colors: {
        dark: {
          background: {
            color: "#123946",
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
        succes: {
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
    },
  },
  plugins: [require("@headlessui/tailwindcss")({ prefix: "ui" })],
};
