import React, { useEffect, useState, useMemo, useRef } from "react";
import * as S from "./styles";
import useResize from "@U/hooks/useResize";
const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const getRandomColor = () => `hsl(${getRandom(0, 360)}, ${getRandom(90, 100)}%, ${getRandom(80, 90)}%)`;

function Loading() {
  const [windowWidth, windowHeight] = useResize();

  return (
    <S.Container>
      <S.InnerContainer>
        <S.Box idx={0}>L</S.Box>
        <S.Box idx={1}>O</S.Box>
        <S.Box idx={2}>A</S.Box>
        <S.Box idx={3}>D</S.Box>
      </S.InnerContainer>
    </S.Container>
  );
}
export default Loading;
