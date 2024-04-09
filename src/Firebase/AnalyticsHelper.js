import { logEvent } from "firebase/analytics";
import { analytics } from "../Providers/AnalyticsProvider";

export function logEventToAnalytics(eventName, params) {
  logEvent(analytics, eventName, params);
}
