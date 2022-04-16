import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";

//navigate
import { useNavigate } from "react-router-dom";

//redux
import { fetchChatsByMember } from "@R/chats/middleware";
import { fetchAllMessages } from "@R/messages/middleware";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

//Functions
import { timeConverter, deltaTime } from "@U/functions/timeConverter";

import { NO_PROFILE } from "@U/hooks/useAuth";

const SingleChatRow = ({ distancePerTime, chatId }: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState([]);
  const [messageReady, setMessageReady] = useState(false);

  useEffect(() => {
    retriveMessages();
  }, [chatId]);

  async function retriveMessages() {
    try {
      const fetchedMessages = await dispatch(fetchAllMessages(chatId));
      setMessages(fetchedMessages.payload.sort((a: any, b: any) => a.createdAt.seconds - b.createdAt.seconds));
      setMessageReady(true);
    } catch (e) {
      console.log(e);
    }
  }
  messages.map((msg: any) => {
    timeConverter(msg.createdAt);
  });

  return (
    <S.SingleRow>
      {messageReady &&
        messages.map((message: any, i: number) => (
          <S.SingleMessage onClick={() => navigate(`/message/${chatId}/${message.messageId}`)} key={i} left={deltaTime(message.createdAt) * distancePerTime}>
            <S.ProfileImg src={message.messageFromProfile || NO_PROFILE} />
            <S.Time>{timeConverter(message.createdAt)}</S.Time>
          </S.SingleMessage>
        ))}
    </S.SingleRow>
  );
};

export default SingleChatRow;
