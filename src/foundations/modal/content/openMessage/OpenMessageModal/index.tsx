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

  async function getMessagePreview() {
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
    getMessagePreview();
  }, [chatId, messageId]);

  return (
    <>
      <S.Background />
      <S.Box>
        <S.CloseButton onClick={() => setIsModalOpen(false)}>
          <S.CloseIcon src={Cancel} />
        </S.CloseButton>
        <S.Contents>
          {messageReady ? (
            permittedStatus ? (
              <OpenMessageModalContents message={message} pos={pos} chatId={chatId} messageId={messageId} />
            ) : (
              <S.Text>
                <p>잠시만 기다려주세요.</p>
                <p>장시간 로딩이 되지 않을경우,</p>
                <p>브라우저의 위치 접근 권한을 확인해주세요.</p>
              </S.Text>
            )
          ) : (
            <S.Text>Loading...</S.Text>
          )}
        </S.Contents>
      </S.Box>
    </>
  );
}
export default OpenMessageModal;
