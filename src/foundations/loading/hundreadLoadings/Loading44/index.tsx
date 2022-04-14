import React from "react";
import * as S from "./styles";

import useResize from "@U/hooks/useResize";

function Loading() {
  return (
    <S.Container>
      {new Array(20).fill(0).map((e, i) => (
        <S.Square idx={i} key={i}>
          Loading
        </S.Square>
      ))}
    </S.Container>
  );
}
export default Loading;
