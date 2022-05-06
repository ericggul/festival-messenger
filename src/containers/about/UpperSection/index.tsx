import React, { useEffect, useRef, useCallback } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

const Fade = require("react-reveal/Fade");

export default function UpperSection() {
  //get user useAppSelector
  const user = useAppSelector((state) => state.users);

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (user.uid) {
      navigate("/map", {
        state: {
          focusAddMessageButton: true,
        },
      });
    } else {
      navigate("/login");
    }
  }, [user]);

  return (
    <S.Container>
      <S.UpperPart onClick={handleClick}>
        <S.SingleClause>
          <S.Header>어디서든</S.Header>
          <S.Text>보낼 수 있지만</S.Text>
        </S.SingleClause>
        <S.SingleClause>
          <S.Header>버들골에서만</S.Header>
          <S.Text>읽을 수 있는 네 마음</S.Text>
        </S.SingleClause>
        <S.SingleClause>
          <S.Header>페스티벌 메신저</S.Header>
        </S.SingleClause>
      </S.UpperPart>

      <S.Button onClick={handleClick}>지금 메시지 작성하기</S.Button>
    </S.Container>
  );
}
