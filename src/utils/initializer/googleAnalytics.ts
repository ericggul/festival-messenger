import ReactGA from "react-ga4";
import { GA_KEY } from "@/configs/analytics";

export function initializeGA() {
  if (GA_KEY) {
    ReactGA.initialize(GA_KEY);
  }
}

/**
 * Event - Add custom tracking event.
 * @param {string} category
 * @param {string} action
 * @param {string} label
 */

export const EventBehavior = (category: any, action: any, label: any) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
