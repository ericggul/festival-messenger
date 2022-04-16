import React, { useEffect, useState, useRef } from "react";
import * as S from "./styles";

//containers
import TimeSection from "@C/messenger/TimeSection";
import SingleChatRow from "@C/messenger/SingleChatRow";
//navigate
import { useNavigate } from "react-router-dom";

//redux
import { fetchChatsByMember } from "@R/chats/middleware";
import { useAppDispatch, useAppSelector } from "@R/common/hooks";

function Messenger() {
  //time Interval: Hours
  //How long 1 hour is in display
  const [distancePerTime, setDistanceInterval] = useState(1);
  //How much time interval is setted in a Time Section
  const [timeInterval, setTimeInterval] = useState(6);
  //Display Recent 72 hours result
  const [maxTimeBefore, setMaxTimeBefore] = useState(72);

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
        <TimeSection maxTimeBefore={maxTimeBefore} timeInterval={timeInterval} distancePerTime={distancePerTime} />
        <S.ChatSection>{chatLoaded && currentChats.map((chat, i) => <SingleChatRow distancePerTime={distancePerTime} key={i} chatId={chat.chatId} />)}</S.ChatSection>
      </S.InnerContainer>
    </S.Container>
  );
}
export default Messenger;
