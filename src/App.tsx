import React, { lazy, Suspense, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@/static/fonts/font.css";
import styled, { ThemeProvider } from "styled-components";
import NotFound from "@P/NotFound";

import useResize from "@U/hooks/useResize";
import { FlexCenterStyle } from "@S/style/responsive/display";
import { GlobalStyle, theme } from "@S/style/index";
import routes from "@/routes";
import PageLoading from "@F/loading/PageLoading";

const Message = lazy(() => import("@/pages/message"));

function App() {
  const [windowWidth, windowHeight] = useResize();
  const themeWithWindowSize = useMemo(() => ({ ...theme, windowHeight, windowWidth }), [windowHeight, windowWidth]);

  return (
    <ThemeProvider theme={themeWithWindowSize}>
      <GlobalStyle />
      <Router>
        <Routes>
          {routes.map((route: any, i: number) => (
            <Route
              key={i}
              path={route.path}
              element={
                <Suspense
                  fallback={
                    <LoadingWrapper height={windowHeight}>
                      <PageLoading />
                    </LoadingWrapper>
                  }
                >
                  <route.component />
                </Suspense>
              }
            />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

interface LoadingWrapperEl {
  height: number;
}

const LoadingWrapper = styled.div<LoadingWrapperEl>`
  width: 100%;
  height: ${({ height }) => height}px;
  ${FlexCenterStyle};
`;
