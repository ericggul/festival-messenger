import { lazy } from "react";

const Intro = lazy(() => import("@/pages/intro/Intro"));

const routes = [
  {
    path: "/",
    component: Intro,
  },
];

export default routes;
