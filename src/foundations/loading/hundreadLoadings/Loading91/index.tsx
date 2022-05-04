import React, { Suspense, useMemo, useState, useRef, useLayoutEffect } from "react";
import useResize from "@U/hooks/useResize";
import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const Box = ({ windowWidth, windowHeight }: any) => {
  const delay = useMemo(() => getRandom(-1, 0), []);
  const size = useMemo(() => getRandom(16, 25), []);

  return (
    <S.Box delay={delay} left={getRandom(0, windowWidth)} size={size} top={getRandom(0, windowHeight)}>
      <S.InnerBox delay={delay} size={size} />
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
