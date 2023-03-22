import React, { useEffect, useMemo } from "react";
import * as S from "./styles";

//preload images
import ENFJ from "@I/aglio/16-types/ENFJ.png";
import ENFP from "@I/aglio/16-types/ENFP.png";
import ENTJ from "@I/aglio/16-types/ENTJ.png";
import ENTP from "@I/aglio/16-types/ENTP.png";
import ESFJ from "@I/aglio/16-types/ESFJ.png";
import ESFP from "@I/aglio/16-types/ESFP.png";
import ESTJ from "@I/aglio/16-types/ESTJ.png";
import ESTP from "@I/aglio/16-types/ESTP.png";
import INFJ from "@I/aglio/16-types/INFJ.png";
import INFP from "@I/aglio/16-types/INFP.png";
import INTJ from "@I/aglio/16-types/INTJ.png";
import INTP from "@I/aglio/16-types/INTP.png";
import ISFJ from "@I/aglio/16-types/ISFJ.png";
import ISFP from "@I/aglio/16-types/ISFP.png";
import ISTJ from "@I/aglio/16-types/ISTJ.png";
import ISTP from "@I/aglio/16-types/ISTP.png";

export default function Aglio() {
  const randomIdx = useMemo(() => Math.floor(Math.random() * 16), []);

  return (
    <S.Container>
      <S.Inner>
        <S.Upper>
          나는 <span>어떤 유형의 리오</span>인지
        </S.Upper>

        <S.Header>
          <S.Top>알리오 올리오</S.Top>
          <S.ExplSector>
            <S.Expl>알아보고</S.Expl>
            <S.Expl>올리자</S.Expl>
          </S.ExplSector>
        </S.Header>

        <S.ImageContainer>
          <img src={[ENFJ, ENFP, ENTJ, ENTP, ESFJ, ESFP, ESTJ, ESTP, INFJ, INFP, INTJ, INTP, ISFJ, ISFP, ISTJ, ISTP][randomIdx]} />
        </S.ImageContainer>

        <S.Text>나는 어떤 리오일까?</S.Text>
        <S.Button>시작하기</S.Button>
      </S.Inner>
    </S.Container>
  );
}
