import React, { useEffect, useState, useMemo, useRef } from "react";
import * as S from "./styles";
import useResize from "@U/hooks/useResize";
const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const getRandomColor = () => `hsl(${getRandom(0, 360)}, ${getRandom(90, 100)}%, ${getRandom(80, 90)}%)`;

const Single = ({ size, idx }: any) => {
  return (
    <S.InnerContainer size={size} idx={idx}>
      <S.Box size={size} idx={0}>
        L
      </S.Box>
      <S.Box size={size} idx={1}>
        O
      </S.Box>
      <S.Box size={size} idx={2}>
        A
      </S.Box>
      <S.Box size={size} idx={3}>
        D
      </S.Box>
    </S.InnerContainer>
  );
};

function Loading() {
  const [windowWidth, windowHeight] = useResize();

  const size = 5;
  return (
    <S.Container>
      {new Array(5).fill(0).map((e, i) => (
        <Single size={size} key={i} idx={i} />
      ))}
    </S.Container>
  );
}
export default Loading;
