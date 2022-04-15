import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";

//containers
import TimeSection from "@C/messenger/TimeSection";

//navigate
import { useNavigate } from "react-router-dom";

//redux
import { fetchChatsByMember } from "@R/chats/middleware";
import { fetchAllMessages } from "@R/messages/middleware";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

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
      setMessages(fetchedMessages.payload);
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
            {message.messageId}
          </S.SingleMessage>
        ))}
    </S.SingleRow>
  );
};

function Messenger() {
  //time Interval: Hours
  const [timeInterval, setTimeInterval] = useState(3);
  const [maxTimeBefore, setMaxTimeBefore] = useState(31);

  const innerContainerRef = useRef<any>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.users);
  const chatsReduxState = useAppSelector((state) => state.chats);
  const [currentChats, setCurrentChats] = useState(chatsReduxState.chats);
  const [chatLoaded, setChatLoaded] = useState(false);

  useEffect(() => {
    if (!user.uid) {
      navigate("/login");
      return;
    }
    retriveChat();
  }, [user]);

  async function retriveChat() {
    try {
      await dispatch(fetchChatsByMember(user.uid));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    let reduxChats = [...chatsReduxState.chats];
    setCurrentChats(
      reduxChats.sort((a, b) => {
        return b.lastUpdatedAt.seconds - a.lastUpdatedAt.seconds;
      })
    );
    setChatLoaded(true);
  }, [chatsReduxState]);

  return (
    <S.Container>
      <S.InnerContainer ref={innerContainerRef}>
        <TimeSection maxTimeBefore={maxTimeBefore} timeInterval={timeInterval} />
        <S.ChatSection>{chatLoaded && currentChats.map((chat, i) => <SingleChatRow key={i} chatId={chat.chatId} />)}</S.ChatSection>
      </S.InnerContainer>
    </S.Container>
  );
}
export default Messenger;
