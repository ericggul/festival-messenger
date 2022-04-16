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

  async function getNameFromId() {
    let name;
    try {
      const from = await dispatch(fetchUserInformationWithoutUpdatingRedux(messageToSend));
      name = from.payload.name;
    } catch (e) {
      name = "";
      alert("No matching user record!");
    }
    return name;
  }

  const handleIconClick = async () => {
    let name = await getNameFromId();
    alert("답장을 보내는 경우 메시지를 읽을 수 있는 위치는 변동될 수 없습니다.");
    navigate(`/writeMessage`, {
      state: {
        id: messageToSend,
        name,
        latLng,
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
