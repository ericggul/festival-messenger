import { lazy } from "react";

const Intro = lazy(() => import("@/pages/intro/Intro"));
const Login = lazy(() => import("@/pages/login/Login"));

const Map = lazy(() => import("@/pages/map"));
const Settings = lazy(() => import("@/pages/settings"));
const Messenger = lazy(() => import("@/pages/messenger"));

const routes = [
  {
    path: "/",
    component: Intro,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/map",
    component: Map,
  },
  {
    path: "/settings",
    component: Settings,
  },
  {
    path: "/messenger",
    component: Messenger,
  },
];

export default routes;
