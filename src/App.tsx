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

function App() {
  const { user, isAuthorized } = useUser();

  const { modalComponent: signInModalComponent, setIsModalOpen } = useModal(SignInModal);

  const [windowWidth, windowHeight] = useResize();
  const themeWithWindowSize = useMemo(() => ({ ...theme, windowHeight, windowWidth }), [windowHeight, windowWidth]);

  return (
    <ThemeProvider theme={themeWithWindowSize}>
      <GlobalStyle />

      <Router>
        <Suspense
          fallback={
            <LoadingWrapper height={windowHeight}>
              <PageLoading />
            </LoadingWrapper>
          }
        >
          <Routes>
            {routes.map((route: any) => (
              <Route path={route.path}>{route.component}</Route>
            ))}
            <Route>
              <NotFound />
            </Route>
          </Routes>
        </Suspense>
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
