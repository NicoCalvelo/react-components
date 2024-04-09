import { app } from "./FirebaseProvider";
import { getAnalytics } from "firebase/analytics";

// Initialize Firebase Analytics
export const analytics = getAnalytics(app);