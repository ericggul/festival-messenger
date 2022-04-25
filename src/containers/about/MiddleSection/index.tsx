import React from "react";
import * as S from "./styles";

const Fade = require("react-reveal/Fade");

function MiddleSection() {
  //contact me section
  return (
    <S.Container>
      <S.TextContainer>
        <Fade left>
          <S.Designed>Designed</S.Designed>
        </Fade>

        <S.And>{"&"}</S.And>
        <S.Developed>Developed</S.Developed>
        <S.By>by</S.By>
        <S.JYC>JYC</S.JYC>
        <S.With>with</S.With>
      </S.TextContainer>
    </S.Container>
  );
}
export default MiddleSection;
