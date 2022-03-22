import { lazy } from "react";

const Home = lazy(() => import("@/pages/start/Start"));

const routes = [
  {
    path: "/",
    component: Home,
  },
];

export default routes;
