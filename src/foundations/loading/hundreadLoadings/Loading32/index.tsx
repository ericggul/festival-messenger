import React from "react";
import * as S from "./styles";

import useResize from "@U/hooks/useResize";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function Loading() {
  const [windowWidth, windowHeight] = useResize();
  return (
    <S.Container>
      {new Array(6).fill(0).map((e, i) => (
        <S.Square key={i} idx={i}>
          loading
        </S.Square>
      ))}
    </S.Container>
  );
}
export default Loading;
