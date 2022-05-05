import React, { useState } from "react";
import * as S from "./styles";

//images
import { NO_PROFILE } from "@U/hooks/useAuth";
import ARROW_LEFT from "@I/icons/messenger/arrow-left.svg";
import ARROW_RIGHT from "@I/icons/messenger/arrow-right.svg";

function Profile({ message, messageISent }: any) {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <S.ProfileImgContainer read={message.read} imgLoading={imgLoading}>
      <S.ProfileImg onLoad={() => setImgLoading(false)} src={message.messageFromProfile || NO_PROFILE} />
      <S.Signifier read={message.read} messageISent={messageISent}>
        <S.SignifierImg src={messageISent ? ARROW_RIGHT : ARROW_LEFT} />
      </S.Signifier>
    </S.ProfileImgContainer>
  );
}
export default Profile;
