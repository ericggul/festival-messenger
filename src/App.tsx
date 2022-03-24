import React, { Suspense, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAuth, { useUser } from "@U/hooks/useAuth";
import useModal from "@U/hooks/useModal";
import styled, { ThemeProvider } from "styled-components";
import NotFound from "@P/NotFound";
import SignInModal from "@F/modal/content/SignInModal";
import useResize from "@U/hooks/useResize";
import { FlexCenterStyle } from "@S/style/responsive/display";
import { GlobalStyle, theme } from "@S/style/index";
import routes from "@/routes";
import PageLoading from "@F/loading/PageLoading";
const Intro = React.lazy(() => import("@/pages/intro/Intro"));

function App() {
  const { user, isAuthorized } = useUser();

  const { modalComponent: signInModalComponent, setIsModalOpen } = useModal(SignInModal);

  const [windowWidth, windowHeight] = useResize();
  const themeWithWindowSize = useMemo(() => ({ ...theme, windowHeight, windowWidth }), [windowHeight, windowWidth]);

  routes.map((route: any, i: number) => console.log(route.component));
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
          <Route element={NotFound} />
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
