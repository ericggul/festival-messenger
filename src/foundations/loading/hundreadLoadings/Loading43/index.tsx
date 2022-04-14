import React from "react";
import * as S from "./styles";

import useResize from "@U/hooks/useResize";

function Loading() {
  return (
    <S.Container>
      <S.Square idx={0}>Loading</S.Square>
      <S.Square idx={1}>Loading</S.Square>
    </S.Container>
  );
}
export default Loading;
