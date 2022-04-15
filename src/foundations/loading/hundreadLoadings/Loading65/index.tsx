import React, { useEffect, useState, useMemo, useRef } from "react";
import * as S from "./styles";
import useResize from "@U/hooks/useResize";
const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const Component = ({ top, left, idx, angle }: any) => {
  const boxRef = useRef<any>(null);

  const angleInterval = useMemo(() => 10, []);
  useEffect(() => {
    if (boxRef && boxRef.current) {
      const bundles = "loading".split("");
      for (let i = 0; i < bundles.length; i++) {
        const n = document.createElement("span");
        n.innerText = bundles[i];
        n.setAttribute(
          "style",
          ` 
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        transform: rotate(${i * angleInterval}deg);
       `
        );

        boxRef.current.appendChild(n);
      }
    }
  }, [boxRef]);

  return <S.Box ref={boxRef} top={top} left={left} idx={idx} angle={angle} />;
};

function Loading() {
  const [windowWidth, windowHeight] = useResize();

  return (
    <S.Container>
      {new Array(40).fill(0).map((_, i) => (
        <Component key={i} top={getRandom(0, windowHeight)} left={getRandom(0, windowWidth)} idx={i} angle={getRandom(0, 360)} />
      ))}
    </S.Container>
  );
}
export default Loading;
