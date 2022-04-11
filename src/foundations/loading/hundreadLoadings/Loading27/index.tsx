import React from "react";
import * as S from "./styles";

import { CubeSpinner } from "loplat-ui";
import useResize from "@U/hooks/useResize";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function Loading() {
  const [windowWidth, windowHeight] = useResize();
  return (
    <S.Container>
      {new Array(100).fill(0).map((e, j) => (
        <S.SpinnerTab key={j} pos={{ x: (windowWidth * Math.floor(j / 10)) / 10, y: (windowHeight / 10) * (j % 10) - 100 }}>
          <CubeSpinner />
        </S.SpinnerTab>
      ))}
      <S.Credit>Loading Spinner developed by Loplat Frontend Team</S.Credit>
    </S.Container>
  );
}
export default Loading;
