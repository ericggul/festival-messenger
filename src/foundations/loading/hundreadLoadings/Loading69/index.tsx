import React, { useEffect, useState, useMemo, useRef } from "react";
import * as S from "./styles";
import useResize from "@U/hooks/useResize";
const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const getRandomColor = () => `hsl(${getRandom(0, 360)}, ${getRandom(90, 100)}%, ${getRandom(80, 90)}%)`;

const Component = ({ top, left, idx, angle, size, color }: any) => {
  const boxRef = useRef<any>(null);

  const angleInterval = useMemo(() => 10, []);
  const leftInterval = useMemo(() => 5, []);
  useEffect(() => {
    if (boxRef && boxRef.current) {
      const bundles = "loading".repeat(20).split("");
      for (let i = 0; i < bundles.length; i++) {
        const n = document.createElement("span");
        n.innerText = bundles[i];
        n.setAttribute(
          "style",
          ` 
        position: absolute;
        left: ${i * leftInterval}px;
        top: 0;
        bottom:  0;
        right: 0;
        margin: auto;
        transform: rotate(${i * angleInterval}deg);
       `
        );

        boxRef.current.appendChild(n);
      }
    }
  }, [boxRef]);

  return <S.Box ref={boxRef} top={top} left={left} idx={idx} angle={angle} size={size} color={color} />;
};

function Loading() {
  const [windowWidth, windowHeight] = useResize();

  return (
    <S.Container>
      {Array.from({ length: 20 }, () => getRandom(windowWidth * 0.1, windowWidth * 0.35)).map((size, i) => (
        <Component key={i} top={getRandom(0, windowHeight) - size / 2} left={getRandom(0, windowWidth) - size / 2} idx={i} angle={getRandom(0, 360)} size={size} color={getRandomColor()} />
      ))}
    </S.Container>
  );
}
export default Loading;
