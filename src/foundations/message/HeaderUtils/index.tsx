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

function HeaderUtils({ messageToSend, latLng, messageFromReads, navigationComingFrom }: any) {
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

  return (
    <S.HeaderUtils>
      <S.Back onClick={() => navigate(`/${navigationComingFrom}`)}>
        <S.Icon src={BackIcon} />
        <S.Text>Back to {navigationComingFrom}</S.Text>
      </S.Back>
      {messageFromReads ? (
        <S.Reply cursor={"default"}>내가 보낸 메시지</S.Reply>
      ) : (
        <S.Reply cursor={"pointer"} onClick={handleIconClick}>
          답장 보내기
        </S.Reply>
      )}
    </S.HeaderUtils>
  );
}
export default HeaderUtils;
