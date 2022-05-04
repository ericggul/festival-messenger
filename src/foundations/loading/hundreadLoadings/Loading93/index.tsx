import React, { Suspense, useMemo, useState, useRef, useLayoutEffect } from "react";
import useResize from "@U/hooks/useResize";
import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const Box = ({ idx }: any) => {
  return (
    <S.Box>
      <S.InnerBox idx={idx} />
    </S.Box>
  );
};

function Loading() {
  const [windowWidth, windowHeight] = useResize();
  return (
    <S.Container>
      {new Array(10).fill(0).map((e, i) => (
        <Box key={i} idx={i} />
      ))}
      <S.LoadingText>Loading</S.LoadingText>
    </S.Container>
  );
}
export default Loading;
