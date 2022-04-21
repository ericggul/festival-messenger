import React from "react";
import * as S from "./styles";

//images
import { NO_PROFILE } from "@U/hooks/useAuth";
import ARROW_LEFT from "@I/icons/messenger/arrow-left.svg";
import ARROW_RIGHT from "@I/icons/messenger/arrow-right.svg";

function Profile({ message, messageISent }: any) {
  return (
    <S.ProfileImgContainer read={message.read}>
      <S.ProfileImg src={message.messageFromProfile || NO_PROFILE} />
      <S.Signifier messageISent={messageISent}>
        <S.SignifierImg src={messageISent ? ARROW_RIGHT : ARROW_LEFT} />
      </S.Signifier>
    </S.ProfileImgContainer>
  );
}
export default Profile;
