import React, { Suspense, useMemo, useState, useRef, useLayoutEffect } from "react";
import useResize from "@U/hooks/useResize";
import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const getRandomColor = () => `hsla(${getRandom(0, 150)}, 100%, ${getRandom(50, 50)}%, .15)`;

const Box = ({ idx }: any) => {
  return (
    <S.Box>
      <S.InnerBox delay={getRandom(-10, 0)} duration={getRandom(3, 7)} color={getRandomColor()} bottom={Math.random() < 0.5} />
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
