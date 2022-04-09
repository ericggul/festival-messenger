import React, { useEffect, useState } from "react";
import * as S from "./styles";

//foundations
import OpenMessageModalContents from "@F/modal/content/openMessage/OpenMessageModalContents";

//hooks
import useGeoLocation from "@U/hooks/useGeoLocation";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

//middleware
import { fetchMessage } from "@R/messages/middleware";

//icons
import Cancel from "@I/icons/modal/cancel.svg";

function OpenMessageModal({ setIsModalOpen, chatId, messageId }: any) {
  //geo location
  const { pos, permittedStatus } = useGeoLocation();

  //fetching message
  const dispatch = useAppDispatch();
  const [messageReady, setMessageReady] = useState(false);
  const [message, setMessage] = useState<any>(null);

  async function getMessage() {
    try {
      const res = await dispatch(fetchMessage({ chatId, messageId }));
      setMessage(res.payload);
      if (res.payload) {
        setMessageReady(true);
      } else {
        alert("메시지가 존재하지 않습니다.");
      }
    } catch (e) {
      alert("메시지가 존재하지 않습니다.");
      console.log(e);
    }
  }

  useEffect(() => {
    getMessage();
  }, [chatId, messageId]);

  return (
    <>
      <S.Background />
      <S.Box>
        <S.CloseButton onClick={() => setIsModalOpen(false)}>
          <S.CloseIcon src={Cancel} />
        </S.CloseButton>
        <S.Contents>
          {messageReady ? permittedStatus ? <OpenMessageModalContents message={message} pos={pos} /> : <S.Text>메시지 열람을 위해서는 위치 권한이 필요합니다.</S.Text> : <S.Text>Loading...</S.Text>}
        </S.Contents>
      </S.Box>
    </>
  );
}
export default OpenMessageModal;
