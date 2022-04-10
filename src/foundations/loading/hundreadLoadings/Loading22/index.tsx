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
      {new Array(100).fill(0).map((e, j) => (
        <S.SpinnerTab key={j} pos={{ x: getRandom(0, windowWidth), y: getRandom(0, windowHeight) }}>
          <CircleSpinner />
        </S.SpinnerTab>
      ))}
      <S.Credit>Loading Spinner Made by Loplat Frontend Team</S.Credit>
    </S.Container>
  );
}
export default Loading;
