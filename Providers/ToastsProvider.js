import React from "react";
import ReactDOM from "react-dom/client";
import { Toasts } from "../Components/Toasts";

// In your Index.js file make an import of this file
// import "./base/Providers/ToastsProvider";

const toasts = ReactDOM.createRoot(document.getElementById("toasts"));
toasts.render(
  <React.StrictMode>
    <Toasts />
  </React.StrictMode>
);
