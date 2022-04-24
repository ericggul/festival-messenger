import React, { lazy, Suspense, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@/static/fonts/font.css";
import "@S/style/mouseTrail/style.css";
import styled, { ThemeProvider } from "styled-components";
import NotFound from "@P/NotFound";

import useResize from "@U/hooks/useResize";

//Toaster
import { Toaster } from "react-hot-toast";

//analytics
import { GA_KEY } from "@/configs/analytics";
import GaAnalytics from "@/UserAnalytics";

//styles
import { GlobalStyle, theme } from "@S/style/index";

//routes
import routes from "@/routes";

//loading
import LoadingContainer from "@C/Loading";

const Message = lazy(() => import("@/pages/message"));

function App() {
  const [windowWidth, windowHeight] = useResize();
  const themeWithWindowSize = useMemo(() => ({ ...theme, windowHeight, windowWidth }), [windowHeight, windowWidth]);

  return (
    <ThemeProvider theme={themeWithWindowSize}>
      <GlobalStyle />
      <Toaster />
      <Router>
        <Routes>
          {routes.map((route: any, i: number) => (
            <Route
              key={i}
              path={route.path}
              element={
                <Suspense fallback={<LoadingContainer />}>
                  <route.component />
                </Suspense>
              }
            />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
        {GA_KEY && <GaAnalytics />}
      </Router>
    </ThemeProvider>
  );
}

export default App;
