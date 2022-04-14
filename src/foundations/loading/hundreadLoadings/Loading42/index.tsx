import React from "react";
import * as S from "./styles";

import useResize from "@U/hooks/useResize";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const getRandomColor = () => `hsl(${getRandom(0, 360)}, ${getRandom(90, 100)}%, ${getRandom(30, 40)}%)`;

function Loading() {
  const [windowWidth, windowHeight] = useResize();
  return (
    <S.Container>
      <S.Square idx={0}>
        <p>Good things come to</p>
        <p>기다리는 자에게</p>
      </S.Square>
      <S.Square idx={1}>
        <p>Those who wait</p>
        <p>복이 있나니</p>
      </S.Square>
    </S.Container>
  );
}
export default Loading;
