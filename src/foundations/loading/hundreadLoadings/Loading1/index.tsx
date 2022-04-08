import React from "react";
import * as S from "./styles";

function Loading1() {
  return (
    <S.Container>
      {"Loading".split("").map((ch: any, i: number) => (
        <span key={i}> {ch}</span>
      ))}
      <S.Overlay />
    </S.Container>
  );
}
export default Loading1;
