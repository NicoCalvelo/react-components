# react-components

Components made in React with tailwind-js, hero-icons and headless-ui ( buttons, forms, dialogs, cards and more ). I use them as base components for my projects.
---------------
<details id=1 open>
<summary><h1>Make it shine ✨</h1></summary>
Follow the next points to set the styles correctly

<h3>Colors</h3>
For the appropiates color scheme it's necessary to extend the colors in the tailwind.config.js file.
There is an example file at the root of this project

<h3>To include in the index.css file :</h3>
there is also a index.css file at the root for example !

```css
@layer components {
  /* Required by base folder ---- */
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
```
</details>


<details id=2>
<summary><h1>Make it work 🔨</h1></summary>

For the use of this folder components it's necessary to install 

```json
    "dependencies":
        "@headlessui/react": "^1.7.17",
        "@headlessui/tailwindcss": "^0.2.0",

    "devDependencies":
        "tailwindcss": "^3.3.3",

```

<h3>Include these div's in the HTML</h3>
```html
	<div id="toasts"></div>
	<div id="confirmation_dialogs"></div>
	<div id="root"></div>
```
<h3>Import in the index.js file the files to include toasts ad dialogs</h3>

```js
import "./base/Providers/ToastsProvider.js";
import "./base/Providers/ConfirmationDialogsProvider.js";

```

<h3>And include in the tailwind.config.js the next plugins </h3>

```js
    plugins: [
        require("@headlessui/tailwindcss")({ prefix: "ui" })
    ],

```
</details>
