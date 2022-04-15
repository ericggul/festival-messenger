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
        {new Array(25).fill(0).map((e, i) => (
          <S.Box key={i} cycle={getRandom(0.2, 0.5)} color={getRandomColor()} />
        ))}
      </S.InnerContainer>
    </S.Container>
  );
}
export default Loading;
