import React from "react";
import * as S from "./styles";

import Heart from "@I/icons/heart/heart.svg";

const Fade = require("react-reveal/Fade");
const Swing = require("react-reveal/Swing");
const LightSpeed = require("react-reveal/LightSpeed");
const Bounce = require("react-reveal/Bounce");
const Wobble = require("react-reveal/Wobble");
const Zoom = require("react-reveal/Zoom");

function MiddleSection() {
  //contact me section
  return (
    <S.Container>
      <S.TextContainer>
        <LightSpeed delay={300}>
          <S.Designed>Designed</S.Designed>
        </LightSpeed>

        <Fade right duration={300} delay={700}>
          <Swing duration={1300} delay={700}>
            <S.And>{"&"}</S.And>
          </Swing>
        </Fade>

        <Bounce bottom duration={1000} delay={1000}>
          <S.Developed>Developed</S.Developed>
        </Bounce>

        <S.By>by</S.By>

        <Zoom right delay={1500} duration={1000}>
          <S.JYC>JYC</S.JYC>
        </Zoom>

        <S.With>with</S.With>
      </S.TextContainer>
    </S.Container>
  );
}
export default MiddleSection;
