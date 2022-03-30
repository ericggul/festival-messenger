import { lazy } from "react";

const Intro = lazy(() => import("@/pages/intro/Intro"));
const Login = lazy(() => import("@/pages/login/Login"));

const routes = [
  {
    path: "/",
    component: Intro,
  },
  {
    path: "/login",
    component: Login,
  },
];

export default routes;
