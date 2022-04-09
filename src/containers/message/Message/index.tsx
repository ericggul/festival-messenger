import React, { useEffect, useMemo, useState } from "react";
import * as S from "./styles";

//React router usenavigate
import { useNavigate } from "react-router-dom";

//containers
import MessageContents from "@C/message/MessageContents";

//hooks
import useGeoLocation from "@U/hooks/useGeoLocation";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

//Functions
import getDistance from "@U/functions/distance";

//middleware
import { fetchMessage } from "@R/messages/middleware";

function Message({ chatId, messageId }: any) {
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
    //get message by id
    getMessage();
  }, [chatId, messageId]);

  //geo location
  const { pos, permittedStatus } = useGeoLocation();
  //Message Availablity based on distance btw message and currentPos
  const [messageAvailable, setMessageAvailable] = useState(false);
  useEffect(() => {
    console.log(message);
    if (message && message.latLngPos) {
      const distance = getDistance(message.latLngPos, pos);
      setMessageAvailable(distance < 50 ? true : false);
    }
  }, [message, pos]);

  const navigate = useNavigate();

  //login, if user is not log-inned

  //edit the chat member && message messageTo,
  //or reject if there is already message messageTo different from current user

  //change the read state of message to 'true'
  useEffect(() => {}, []);

  console.log(permittedStatus, messageAvailable);
  return (
    <S.Container>
      {permittedStatus ? (
        messageReady && messageAvailable ? (
          <MessageContents toName={message.toName} mainText={message.mainText.replaceAll("\\n", "\n")} color={message.color} font={message.font} image={message.imageUrl} music={message.musicUrl} />
        ) : (
          <>
            <S.Text>
              <p>메시지는 버들골 내 핀 근처에서만 열람할 수 있습니다.</p>
              <p>핀이 찍힌 위치로 가서 메시지를 다시 열람해주세요.</p>
            </S.Text>
            <S.ToMainButton onClick={() => navigate("/map")}>메인으로 가기</S.ToMainButton>
          </>
        )
      ) : (
        <S.Text>
          <p>잠시만 기다려주세요.</p>
          <p>장시간 로딩이 되지 않을경우,</p>
          <p>브라우저의 위치 접근 권한을 확인해주세요.</p>
        </S.Text>
      )}
    </S.Container>
  );
}
export default Message;
