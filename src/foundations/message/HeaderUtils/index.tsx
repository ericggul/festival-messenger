import React from "react";
import * as S from "./styles";

//React router usenavigate
import { useNavigate } from "react-router-dom";

//hooks
import { useAppDispatch } from "@R/common/hooks";

//middleware
import { fetchUserInformationWithoutUpdatingRedux } from "@R/users/middleware";

//Icons
import BackIcon from "@I/icons/writeMessage/back_white.svg";

function HeaderUtils({ messageToSend, latLng, messageFromReads, navigationComingFrom, chatId, messageId }: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleIconClick = () => {
    navigate(`/map`, {
      state: {
        focusAddMessageButton: true,
        addMessageTo: messageToSend,
      },
    });
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(`https://festival-messenger.com/message/${chatId}/${messageId}`);
    alert("메시지 링크가 복사되었습니다!");
  };

  return (
    <S.HeaderUtils>
      <S.Back onClick={() => navigate(`/${navigationComingFrom}`)}>
        <S.Icon src={BackIcon} />
        <S.Text>Back to {navigationComingFrom}</S.Text>
      </S.Back>
      {messageFromReads ? <S.Reply2 onClick={handleShareClick}>메시지 링크 복사</S.Reply2> : <S.Reply onClick={handleIconClick}>답장 보내기</S.Reply>}
    </S.HeaderUtils>
  );
}
export default HeaderUtils;
