import React, { useEffect, useState } from "react";
import * as S from "./styles";

//containers
import SingleChatLabel from "@C/messenger/singleChat/SingleChatLabel";
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
  const [displayedName, setDisplayedName] = useState<any>(null);

  useEffect(() => {
    retriveMessages();
  }, [chat]);

  async function retriveMessages() {
    try {
      const fetchedMessages = await dispatch(fetchAllMessages(chat.chatId));
      //Filter 72 hours and sort by time
      fetchedMessages.payload.forEach((msg: any) => {
        console.log(msg.createdAt.seconds);
        console.log(deltaTime(msg.createdAt));
      });
      let sortedMessages = fetchedMessages.payload.filter((msg: any) => deltaTime(msg.createdAt) < SEVENTY_TWO_HOURS).sort((a: any, b: any) => a.createdAt.seconds - b.createdAt.seconds);
      setMessages(sortedMessages);
      setMessageReady(true);

      //set displayed message name logic
      let targetMessage = fetchedMessages.payload[0];
      if (targetMessage.messageFrom === user.uid) {
        setDisplayedName(targetMessage.toName);
      } else {
        try {
          const userInfo = await dispatch(fetchUserInformationWithoutUpdatingRedux(targetMessage.messageFrom));
          setDisplayedName(userInfo.payload.name);
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <S.Container>
      {messageReady && (
        <>
          {/* <SingleChatLabel name={displayedName || "No Name"} /> */}
          <SingleChatRow user={user} distancePerTime={distancePerTime} messages={messages} chatId={chat.chatId} />
        </>
      )}
    </S.Container>
  );
}
export default SingleChat;
