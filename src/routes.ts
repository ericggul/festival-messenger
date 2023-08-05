import { lazy } from "react";

const Intro = lazy(() => import("@/pages/intro/Intro"));
const Login = lazy(() => import("@/pages/login/Login"));

const Map = lazy(() => import("@/pages/map"));
const Settings = lazy(() => import("@/pages/settings"));
const Messenger = lazy(() => import("@/pages/messenger"));
const Message = lazy(() => import("@/pages/message"));
const WriteMessage = lazy(() => import("@/pages/writeMessage"));

const About = lazy(() => import("@/pages/about"));
const SVK = lazy(() => import("@/pages/tempTesting/shareViaKakao"));
const Writing = lazy(() => import("@/pages/tempTesting/writing"));

//Aligo
const Aglio = lazy(() => import("@/pages/aglio/Aglio"));
const AglioResults = lazy(() => import("@/pages/aglio/Results"));

//odbd
const ODBD = lazy(() => import("@/pages/odbd/Odbd"));
const ODBDResults = lazy(() => import("@/pages/odbd/Results"));

//loading
const Loading = lazy(() => import("@/pages/loading/Loading"));

const routes = [
  {
    path: "/",
    component: Intro,
  },
  {
    path: "/aglio",
    component: Aglio,
  },
  {
    path: "/aglio/results/:type",
    component: AglioResults,
  },
  {
    path: "/odbd",
    component: ODBD,
  },
  {
    path: "/odbd/results/:type",
    component: ODBDResults,
  },
  {
    path: "/about",
    component: About,
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
  {
    path: "/message/:chatId/:messageId",
    component: Message,
  },
  {
    path: "/message/:chatId/:messageId/:navigationComingFrom",
    component: Message,
  },
  {
    path: "/writeMessage",
    component: WriteMessage,
  },
  {
    path: "/svk",
    component: SVK,
  },
  {
    path: "/writing",
    component: Writing,
  },
  {
    path: "/loading",
    component: Loading,
  },
];

export default routes;
