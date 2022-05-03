import React from "react";
import * as S from "./styles";

import { CircleSpinner } from "loplat-ui";
import useResize from "@U/hooks/useResize";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const getRandomColor = () => `hsl(${getRandom(330, 360)}, ${getRandom(90, 100)}%, ${getRandom(30, 40)}%)`;

function Loading() {
  const [windowWidth, windowHeight] = useResize();
  return (
    <S.Container>
      {new Array(30).fill(0).map((e, j) => (
        <S.SpinnerTab key={j} pos={{ x: getRandom(-50, windowWidth - 50), y: getRandom(-200, windowHeight - 200) }}>
          <CircleSpinner scale={getRandom(1, getRandom(1, 5))} duration={getRandom(1000, 3000)} />
        </S.SpinnerTab>
      ))}
      <S.Credit>Loading Spinner Made by Loplat Frontend Team</S.Credit>
      <S.Overlay color={"white"} />
    </S.Container>
  );
}
export default Loading;
