import "./index.css";
import { createRoot } from "react-dom/client";
import "./Providers/ToastsProvider.js";
import "./Providers/ConfirmationDialogsProvider.js";
import Showcase from "./Showcase.jsx";

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(<Showcase />);
