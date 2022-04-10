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
      <S.Rotate>
        {new Array(10).fill(0).map((e, j) => (
          <S.SpinnerTab key={j} pos={{ x: 150 + 150 * Math.sin((j / 10) * Math.PI * 2) - 58, y: 150 * Math.cos((j / 10) * Math.PI * 2) }}>
            <CircleSpinner duration={getRandom(1000, 3000)} />
          </S.SpinnerTab>
        ))}
      </S.Rotate>
      <S.Credit>Loading Spinner Made by Loplat Frontend Team</S.Credit>
    </S.Container>
  );
}
export default Loading;
