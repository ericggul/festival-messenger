import React, { useEffect, useRef, useCallback } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";
import useAuth from "@U/hooks/useAuth";

const Fade = require("react-reveal/Fade");

export default function UpperSection() {
  //get user useAppSelector
  const user = useAppSelector((state) => state.users);

  const navigate = useNavigate();

  const { signIn } = useAuth("/settings");

  const handleClick = useCallback(() => {
    if (user.uid) {
      navigate("/map", {
        state: {
          focusAddMessageButton: true,
        },
      });
    } else {
      alert("메시지를 작성하기 위해서는 카카오톡 로그인이 필요합니다!");
      signIn();
    }
  }, [user]);

  return (
    <S.Container>
      <S.UpperPart onClick={handleClick}>
        <S.SingleClause>
          <S.Header delay={0}>보낸사람이</S.Header>
          <S.Text delay={0.5}>지정한 장소 에서만</S.Text>
        </S.SingleClause>
        <S.SingleClause>
          <S.Header delay={1}>읽어 볼 수 있는</S.Header>
          <S.Text delay={1.5}>GPS기반 메신저</S.Text>
        </S.SingleClause>
        <S.SingleClause>
          <S.Header delay={2}>페스티벌 메신저</S.Header>
        </S.SingleClause>
      </S.UpperPart>

      <S.Button onClick={handleClick}>지금 메시지 작성하기</S.Button>
    </S.Container>
  );
}
