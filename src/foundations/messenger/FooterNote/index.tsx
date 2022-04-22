import React from "react";
import * as S from "./styles";
//styles from profile sections
import * as PS from "@F/messenger/ProfileSection/styles";

//images
import ARROW_LEFT from "@I/icons/messenger/arrow-left.svg";
import ARROW_RIGHT from "@I/icons/messenger/arrow-right.svg";

function FooterNote() {
  return (
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
  );
}
export default FooterNote;
