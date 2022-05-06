import React from "react";
import * as S from "./styles";

import { TEXT } from "./text";
import { useNavigate } from "react-router-dom";

function LowerSection() {
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.Header>작품 소개</S.Header>
      <S.Main>
        {TEXT.map((text: string, i: any) => (
          <S.Paragraph key={i}>{text}</S.Paragraph>
        ))}
        <S.Last>2022.05.05 최정윤</S.Last>

        <S.Button onClick={() => navigate("/login")}>로그인하고 잊혔던 가치 되찾으러 가기</S.Button>
      </S.Main>
    </S.Container>
  );
}
export default LowerSection;
