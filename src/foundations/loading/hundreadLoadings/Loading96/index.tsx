import React, { Suspense, useMemo, useState, useRef, useLayoutEffect } from "react";
import useResize from "@U/hooks/useResize";
import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const getRandomColor = () => `hsl(${getRandom(0, 360)}, 100%, 50%)`;

const Box = ({ idx }: any) => {
  return (
    <S.Box>
      <S.InnerBox delay={getRandom(-1, 0)} duration={getRandom(2, 5)} color={getRandomColor()} />
    </S.Box>
  );
};

function Loading() {
  return (
    <S.Container>
      {new Array(20).fill(0).map((e, i) => (
        <Box key={i} idx={i} />
      ))}
      <S.LoadingText>Loading</S.LoadingText>
    </S.Container>
  );
}
export default Loading;
