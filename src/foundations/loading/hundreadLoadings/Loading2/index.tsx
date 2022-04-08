import React from "react";
import * as S from "./styles";

function Loading1() {
  return (
    <S.Container>
      {new Array(10).fill(0).map((e, i) => (
        <S.Row key={-i} idx={i}>
          {"Loading".split("").map((ch: any, i: number) => (
            <span key={i}> {ch}</span>
          ))}
        </S.Row>
      ))}

      <S.Overlay />
    </S.Container>
  );
}
export default Loading1;
