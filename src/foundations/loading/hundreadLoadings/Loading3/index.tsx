import React from "react";
import * as S from "./styles";

function Loading1() {
  return (
    <S.Container>
      <S.Row>
        {new Array(3).fill(0).map((ch: any, i: number) => (
          <div key={i} />
        ))}
      </S.Row>
      <S.LoadingText>Loading</S.LoadingText>

      <S.Overlay />
    </S.Container>
  );
}
export default Loading1;
