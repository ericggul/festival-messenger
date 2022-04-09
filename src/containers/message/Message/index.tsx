import React, { useEffect, useMemo, useState } from "react";
import * as S from "./styles";
import MessageBackground from "@F/background/MessageBackground";

//hooks
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

//middleware
import { fetchMessage } from "@R/messages/middleware";

function Message({ chatId, messageId }: any) {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<any>(null);

  async function getMessage() {
    try {
      const res = await dispatch(fetchMessage({ chatId, messageId }));
      setMessage(res.payload);
    } catch (e) {
      alert("failed to get message");
      console.log(e);
    }
  }
  useEffect(() => {
    //get message by id
    getMessage();
  }, [chatId, messageId]);

  return (
    <S.Container>
      <MessageBackground />
    </S.Container>
  );
}
export default Message;
