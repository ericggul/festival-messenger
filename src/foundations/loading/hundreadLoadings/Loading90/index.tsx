import React, { Suspense, useMemo, useState, useRef, useLayoutEffect } from "react";
import useResize from "@U/hooks/useResize";
import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const Box = ({ windowWidth, windowHeight }: any) => {
  const delay = useMemo(() => getRandom(0, 0), []);

  return (
    <S.Box delay={delay} left={getRandom(0, windowWidth)} top={getRandom(0, windowHeight)}>
      <S.InnerBox delay={delay} />
    </S.Box>
  );
};
function Loading() {
  const [windowWidth, windowHeight] = useResize();
  return (
    <S.Container>
      {new Array(30).fill(0).map((e, i) => (
        <Box key={i} windowWidth={windowWidth} windowHeight={windowHeight} />
      ))}
    </S.Container>
  );
}
export default Loading;
