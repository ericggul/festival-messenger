import { useEffect } from "react";
import { useLocation } from "react-router";
import ReactGA from "react-ga4";

function UserAnalytics() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
    ReactGA.send({ hitType: "pageview", page: pathname });
  }, [pathname]);

  return null;
}
export default UserAnalytics;
