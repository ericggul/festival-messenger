import React, { useEffect, useState, useMemo } from "react";
import * as S from "./styles";
import useResize from "@U/hooks/useResize";
const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
function Loading() {
  const [windowWidth, windowHeight] = useResize();

  return (
    <S.Container>
      {new Array(100).fill(0).map((e, i) => (
        <S.Square key={i} idx={i} top={((i % 10) * windowHeight) / 10} left={(Math.floor(i / 10) * windowWidth) / 10} rotate={getRandom(-10, 10)}>
          {Math.random() < 0.5 ? "Loading" : "Loading".split("").reverse().join("")}
        </S.Square>
      ))}
    </S.Container>
  );
}
export default Loading;
