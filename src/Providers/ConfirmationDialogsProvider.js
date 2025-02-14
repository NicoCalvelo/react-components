import React from "react";
import ReactDOM from "react-dom/client";
import ConfirmationModal from "../Dialogs/ConfirmationModal";
import AskForInputModal from "../Dialogs/AskForInputModal";

// In your Index.js file make an import of this file
// import "./base/Providers/ConfirmationDialogsProvider";

const toasts = ReactDOM.createRoot(document.getElementById("confirmation_dialogs"));
toasts.render(
  <React.StrictMode>
    <ConfirmationModal />
    <AskForInputModal />
  </React.StrictMode>
);
