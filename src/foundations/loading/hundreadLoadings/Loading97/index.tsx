import React, { Suspense, useMemo, useState, useRef, useLayoutEffect } from "react";
import useResize from "@U/hooks/useResize";
import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const getRandomColor = () => `hsl(${getRandom(250, 330)}, 100%, ${getRandom(70, 100)}%)`;

const Box = ({ idx }: any) => {
  return (
    <S.Box>
      <S.InnerBox delay={-idx * 0.1} duration={getRandom(1, 1)} color={getRandomColor()} />
    </S.Box>
  );
};

function Loading() {
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
