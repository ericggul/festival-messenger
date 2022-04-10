import React from "react";
import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function Loading() {
  return (
    <S.Container>
      {new Array(4).fill(0).map((e, j) => (
        <S.Wrapper>
          {new Array(10).fill(0).map((e, i) => (
            <S.LoadingText key={i} idx={getRandom(0, 10)}>
              Loading
            </S.LoadingText>
          ))}
        </S.Wrapper>
      ))}

      <S.Overlay />
    </S.Container>
  );
}
export default Loading;
