# react-components
Components made in React with tailwind-js, hero-icons and headless-ui ( buttons, forms, dialogs, cards and more ). I use them as base components for my projects.


For the use of this folder components it's necessary to install :

    "dependencies":
        1- "@headlessui/react": "^1.7.14",
        2- "@headlessui/tailwindcss": "^0.1.3", 

    "devDependencies": 
        1- "tailwindcss": "^3.3.2",

And include in the tailwind.config.js the next plugins :

    plugins: [
        require("@headlessui/tailwindcss")({ prefix: "ui" })
    ],

For the appropiates color scheme it's necessary to extend the colors in the tailwind.config.js file : (Example)

   colors: {
        dark: {
          background: {
            color: "#28232E",
            light: "#3B3545",
          },
          text: {
            color: "#DDE0E4",
            light: "#A3A3A3",
          },
        },
        text: {
          color: "#212529",
          light: "#696969",
        },
        background: {
          color: "#ffffff",
          dark: "#f1f1f1",
        },
        primary: {
          light: "#A9DAD8",
          color: "#49ABA6",
          dark: "#37817D",
          on: "#ffffff",
        },
        secondary: {
          light: "#EBC1E4",
          color: "#BA3CA5",
          dark: "#6e2e63",
          on: "#ffffff",
        },
        info: {
          light: "#93C5FD",
          color: "#2563EB",
          dark: "#1E40AF",
          on: "#fff",
        },
        warning: {
          light: "#FDE68A",
          color: "#F59E0B",
          dark: "#D97706",
          on: "#1a1414",
        },
        error: {
          light: "#FCA5A5",
          color: "#DC2626",
          dark: "#991B1B",
          on: "#fff",
        },
      },