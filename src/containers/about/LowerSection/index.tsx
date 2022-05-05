import React from "react";
import * as S from "./styles";

import { TEXT } from "./text";

function LowerSection() {
  return (
    <S.Container>
      <S.Header>작품 소개</S.Header>
      <S.Main>
        {TEXT.map((text: string, i: number) => (
          <S.Paragraph key={i}>{text}</S.Paragraph>
        ))}
        <S.Last>2022.05.05 최정윤</S.Last>
      </S.Main>
    </S.Container>
  );
}
export default LowerSection;
