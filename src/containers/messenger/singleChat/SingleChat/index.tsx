import React, { useEffect, useState } from "react";
import * as S from "./styles";

//containers
import SingleChatRow from "@C/messenger/singleChat/SingleChatRow";

//redux
import { fetchUserInformationWithoutUpdatingRedux } from "@R/users/middleware";
import { fetchAllMessages } from "@R/messages/middleware";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

//functions
import { deltaTime, SEVENTY_TWO_HOURS } from "@U/functions/timeConverter";

function SingleChat({ chat, user, distancePerTime }: any) {
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState([]);
  const [messageReady, setMessageReady] = useState(false);

  useEffect(() => {
    retriveMessages();
  }, [chat]);

  async function retriveMessages() {
    try {
      const fetchedMessages = await dispatch(fetchAllMessages(chat.chatId));
      //Filter 72 hours and sort by time
      let sortedMessages = fetchedMessages.payload.filter((msg: any) => deltaTime(msg.createdAt) < SEVENTY_TWO_HOURS).sort((a: any, b: any) => a.createdAt.seconds - b.createdAt.seconds);
      setMessages(sortedMessages);
      setMessageReady(true);
    } catch (e) {
      console.log(e);
    }
  }

  return <S.Container>{messageReady && <SingleChatRow user={user} distancePerTime={distancePerTime} messages={messages} chat={chat} />}</S.Container>;
}
export default SingleChat;
