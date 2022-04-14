import React from "react";
import * as S from "./styles";

import useResize from "@U/hooks/useResize";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function Loading() {
  const [windowWidth, windowHeight] = useResize();
  return (
    <S.Container>
      <S.RowAlign>
        {new Array(7).fill(0).map((e, i) => (
          <S.Square key={i} idx={i}></S.Square>
        ))}
      </S.RowAlign>

      <S.ColAlign>
        {new Array(7).fill(0).map((e, i) => (
          <S.Square key={i} idx={i}></S.Square>
        ))}
      </S.ColAlign>

      <S.Overlay />
    </S.Container>
  );
}
export default Loading;
