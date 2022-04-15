import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";

//navigate
import { useNavigate } from "react-router-dom";

//redux
import { fetchChatsByMember } from "@R/chats/middleware";
import { fetchAllMessages } from "@R/messages/middleware";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

import { NO_PROFILE } from "@U/hooks/useAuth";

const SingleChatRow = ({ chatId }: any) => {
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
      setMessages(fetchedMessages.payload.sort((a: any, b: any) => b.createdAt - a.createdAt));
      setMessageReady(true);
    } catch (e) {
      console.log(e);
    }
  }

  console.log(messages);

  return (
    <S.SingleRow>
      {messageReady &&
        messages.map((message: any, i: number) => (
          <S.SingleMessage onClick={() => navigate(`/message/${chatId}/${message.messageId}`)} key={i}>
            <S.ProfileImg src={message.messageFromProfile || NO_PROFILE} />
          </S.SingleMessage>
        ))}
    </S.SingleRow>
  );
};

export default SingleChatRow;
