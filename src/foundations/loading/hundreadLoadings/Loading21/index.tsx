import React from "react";
import * as S from "./styles";

import { CircleSpinner } from "loplat-ui";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const getRandomColor = () => `hsl(${getRandom(330, 360)}, ${getRandom(90, 100)}%, ${getRandom(30, 40)}%)`;

function Loading() {
  return (
    <S.Container>
      {new Array(4).fill(0).map((e, j) => (
        <CircleSpinner key={j} />
      ))}

      <S.Credit>Loading Spinner Made by Loplat Frontend Team</S.Credit>
      {/* <S.Overlay color={"white"} /> */}
    </S.Container>
  );
}
export default Loading;
