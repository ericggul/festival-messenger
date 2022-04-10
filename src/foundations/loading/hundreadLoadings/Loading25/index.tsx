import React from "react";
import * as S from "./styles";

import { CircleSpinner } from "loplat-ui";
import useResize from "@U/hooks/useResize";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function Loading() {
  return (
    <S.Container>
      <S.Rotate>
        {new Array(5).fill(0).map((e, j) => (
          <S.SpinnerTab key={j} pos={{ x: 150 + 75 * Math.sin((j / 5) * Math.PI * 2) - 58, y: 75 * Math.cos((j / 5) * Math.PI * 2) }}>
            <CircleSpinner />
          </S.SpinnerTab>
        ))}

        {new Array(10).fill(0).map((e, j) => (
          <S.SpinnerTab key={j} pos={{ x: 150 + 150 * Math.sin((j / 10) * Math.PI * 2) - 58, y: 150 * Math.cos((j / 10) * Math.PI * 2) }}>
            <CircleSpinner />
          </S.SpinnerTab>
        ))}

        {new Array(15).fill(0).map((e, j) => (
          <S.SpinnerTab key={j} pos={{ x: 150 + 225 * Math.sin((j / 15) * Math.PI * 2) - 58, y: 225 * Math.cos((j / 15) * Math.PI * 2) }}>
            <CircleSpinner />
          </S.SpinnerTab>
        ))}
      </S.Rotate>
      <S.Credit>Loading Spinner developed by Loplat Frontend Team</S.Credit>
    </S.Container>
  );
}
export default Loading;
