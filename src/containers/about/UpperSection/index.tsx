import React, { useEffect, useRef } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import useResize from "@U/hooks/useResize";

const Fade = require("react-reveal/Fade");

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

export default function UpperSection() {
  const [windowWidth, windowHeight] = useResize();

  const navigate = useNavigate();

  return (
    <S.Container>
      <S.UpperPart>
        <S.SingleClause>
          <Fade delay={500}>
            <S.Header>어디서든</S.Header>
          </Fade>
          <Fade delay={1300}>
            <S.Text>보낼 수 있지만</S.Text>
          </Fade>
        </S.SingleClause>
        <S.SingleClause>
          <Fade delay={2100}>
            <S.Header>버들골에서만</S.Header>
          </Fade>
          <Fade delay={2900}>
            <S.Text>읽을 수 있는 네 마음</S.Text>
          </Fade>
        </S.SingleClause>
        <S.SingleClause>
          <Fade delay={3700}>
            <S.Header>페스티벌 메신저</S.Header>
          </Fade>
        </S.SingleClause>
      </S.UpperPart>
      <Fade delay={4500}>
        <S.Button
          onClick={() =>
            navigate("/map", {
              state: {
                focusAddMessageButton: true,
              },
            })
          }
        >
          지금 메시지 작성하기
        </S.Button>
      </Fade>
    </S.Container>
  );
}
