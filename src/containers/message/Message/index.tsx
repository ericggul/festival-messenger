import React, { useEffect, useMemo, useState } from "react";
import * as S from "./styles";

//containers
import MessageContents from "@C/message/MessageContents";

//hooks
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

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

  return (
    <S.Container>
      {messageReady && (
        <MessageContents toName={message.toName} mainText={message.mainText.replaceAll("\\n", "\n")} color={message.color} font={message.font} image={message.imageUrl} music={message.musicUrl} />
      )}
    </S.Container>
  );
}
export default Message;
