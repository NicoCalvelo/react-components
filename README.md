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


include in the index.css file

@layer components {
  /* Required by Prefabs folder ---- */
  .btn {
    @apply font-semibold transition-all duration-75 ease-in-out flex w-fit items-center space-x-2 rounded-lg cursor-pointer focus:ring-0 px-6 py-2 disabled:pointer-events-none disabled:opacity-70;
  }
  .icon-btn {
    @apply rounded-full transition-all duration-75 ease-in-out cursor-pointer focus:ring-0 p-2 disabled:pointer-events-none disabled:opacity-70;
  }
  .card {
    @apply relative rounded-xl p-5;
  }

  /* Personalized ---- */
  .primary-gradient-to-bottom-right {
    @apply bg-gradient-to-br from-primary-color to-primary-dark;
  }
  .secondary-gradient-to-bottom-right {
    @apply bg-gradient-to-br from-secondary-color to-secondary-dark;
  }
  .danger-btn {
    @apply font-semibold flex items-center space-x-1 rounded-lg bg-error-color text-error-on py-2 dark:bg-error-light dark:text-error-dark cursor-pointer focus:ring-0 px-6;
  }
  .danger-btn-outlined {
    @apply font-semibold rounded-lg border border-error-color flex items-center space-x-1 bg-transparent hover:bg-error-color hover:bg-opacity-20 py-2 text-current cursor-pointer focus:ring-0 px-6;
  }
  .icon-btn-outlined {
    @apply rounded-full border hover:bg-background-dark hover:bg-opacity-20 p-2 cursor-pointer focus:ring-0;
  }
}