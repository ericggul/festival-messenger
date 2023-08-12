import React, { useEffect, useState, useMemo } from "react";
import * as S from "./styles";
import useResize from "@U/hooks/useResize";
const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
function Loading() {
  const [windowWidth, windowHeight] = useResize();
  const array = "LOADING".split("");
  const topArray = useMemo(() => Array.from({ length: 100 }, () => getRandom(0, windowHeight)), [windowWidth, windowHeight]);
  const leftArray = useMemo(() => Array.from({ length: 100 }, () => getRandom(0, windowWidth)), [windowWidth, windowHeight]);
  const sizeArray = useMemo(() => Array.from({ length: 100 }, () => getRandom(20, getRandom(30, getRandom(50, 200)))), [windowWidth, windowHeight]);
  const rotateArray = useMemo(() => Array.from({ length: 100 }, () => getRandom(0, 360)), [windowWidth, windowHeight]);

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((idx) => (idx + 1) % array.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <S.Container>
      {new Array(100).fill(0).map((e, i) => (
        <S.Circle key={i} top={topArray[i]} left={leftArray[i]} size={sizeArray[i]} rotate={rotateArray[i]}>
          {array[idx]}
        </S.Circle>
      ))}
    </S.Container>
  );
}
export default Loading;
