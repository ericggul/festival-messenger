import React from "react";
import * as S from "./styles";
//styles from profile sections
import * as PS from "@F/messenger/ProfileSection/styles";

import { useNavigate } from "react-router-dom";

//images

import ARROW_LEFT from "@I/icons/messenger/arrow-left.svg";
import ARROW_RIGHT from "@I/icons/messenger/arrow-right.svg";

function FooterNote() {
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.FooterNote>
        <S.Signifier messageISent={false}>
          <S.SignifierImg src={ARROW_LEFT} />
        </S.Signifier>
        {"받은 메시지"}
        <S.Signifier messageISent>
          <S.SignifierImg src={ARROW_RIGHT} />
        </S.Signifier>
        {"보낸 메시지"}
      </S.FooterNote>
      <S.SendButton onClick={() => navigate("/map")}>
        <S.Signifier messageISent>+</S.Signifier>
        새로운 메시지 보내기
      </S.SendButton>
    </S.Container>
  );
}
export default FooterNote;
