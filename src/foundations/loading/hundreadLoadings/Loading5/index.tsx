import React from "react";
import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const getRandomColor = () => `hsl(${getRandom(0, 350)}, 100%, 80%)`;

function Loading() {
  return (
    <S.Container>
      {new Array(4).fill(0).map((e, j) => (
        <S.Wrapper>
          {new Array(10).fill(0).map((e, i) => (
            <S.LoadingText key={i} idx={getRandom(0, 10)} color={getRandomColor}>
              Loading
            </S.LoadingText>
          ))}
        </S.Wrapper>
      ))}

      <S.Overlay color={"black"} />
    </S.Container>
  );
}
export default Loading;
