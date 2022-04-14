import React from "react";
import * as S from "./styles";

import useResize from "@U/hooks/useResize";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const getRandomColor = () => `hsl(${getRandom(0, 360)}, ${getRandom(90, 100)}%, ${getRandom(30, 40)}%)`;

function Loading() {
  const [windowWidth, windowHeight] = useResize();
  return (
    <S.Container>
      {new Array(51).fill(0).map((e, i) => (
        <S.Square key={i} idx={i} color={`rgb(${50 + i * 1.5}, ${200 - i * 3}, ${i * 4})`}></S.Square>
      ))}
    </S.Container>
  );
}
export default Loading;
